# importing required libraries
# import json
# import sys

# temp = sys.argv[1]
# json_obj = json.loads(temp)

# res=""
# for key in json_obj:
#     res+=json_obj[key]+" "
# res = res.strip().split()


# importing required libraries
import numpy as np
import pandas as pd
import csv

# dataset doesn't have column names, so we have to provide it
col_names = ["duration","protocol_type","service","flag","src_bytes",
    "dst_bytes","land","wrong_fragment","urgent","hot","num_failed_logins",
    "logged_in","num_compromised","root_shell","su_attempted","num_root",
    "num_file_creations","num_shells","num_access_files","num_outbound_cmds",
    "is_host_login","is_guest_login","count","srv_count","serror_rate",
    "srv_serror_rate","rerror_rate","srv_rerror_rate","same_srv_rate",
    "diff_srv_rate","srv_diff_host_rate","dst_host_count","dst_host_srv_count",
    "dst_host_same_srv_rate","dst_host_diff_srv_rate","dst_host_same_src_port_rate",
    "dst_host_srv_diff_host_rate","dst_host_serror_rate","dst_host_srv_serror_rate",
    "dst_host_rerror_rate","dst_host_srv_rerror_rate","label","difficulty_level"]

# cols that require input
inp_col_names = ["count","logged_in","srv_serror_rate","serror_rate","dst_host_serror_rate",
                  "dst_host_same_srv_rate","dst_host_srv_serror_rate","dst_host_srv_count",
                  "same_srv_rate","protocol_type","service","flag"]

# cols that don't need input
default_col_names=[]
for i in col_names:
    if i not in inp_col_names:
        default_col_names.append(i)


d={}
r=""
f=open(r"C:\inputfile.txt")
for i in f.readline().split(" "):
    if(i.isalpha()):
        r=r+i+" "
    else:
        r=r+str(i)+" "
r=r[:-1]

row=r.split()
row.append("fdfs")
# row=input().split()

for i in range(len(inp_col_names)):
    if inp_col_names[i]=="protocol_type" or inp_col_names[i]=="service" or inp_col_names[i]=="flag" or inp_col_names[i]=="label":
        d[inp_col_names[i]]=  row[i]
    else:
        d[inp_col_names[i]] = float(row[i])
for col in default_col_names:
    d[col] = 0

test_list = [d[col] for col in col_names]

with open('D:/NIDS/ML_Projects/Network-Intrusion-Detection-Using-Machine-Learning/datasets/nids_input.csv','w',newline='') as file:
    writer = csv.writer(file)
    writer.writerow(col_names)
    writer.writerow(test_list)

data = pd.read_csv('D:/NIDS/ML_Projects/Network-Intrusion-Detection-Using-Machine-Learning/datasets/KDDTrainandtest.csv',header=None, names=col_names)
testdata = pd.read_csv('D:/NIDS/ML_Projects/Network-Intrusion-Detection-Using-Machine-Learning/datasets/nids_input.csv')

data = data.append(testdata.iloc[0],ignore_index=True)

# changing attack labels to their respective attack class
def change_label(df):
  df.label.replace(['apache2','back','land','neptune','mailbomb','pod','processtable','smurf','teardrop','udpstorm','worm'],'Dos',inplace=True)
  df.label.replace(['ftp_write','guess_passwd','httptunnel','imap','multihop','named','phf','sendmail',
       'snmpgetattack','snmpguess','spy','warezclient','warezmaster','xlock','xsnoop'],'R2L',inplace=True)
  df.label.replace(['ipsweep','mscan','nmap','portsweep','saint','satan'],'Probe',inplace=True)
  df.label.replace(['buffer_overflow','loadmodule','perl','ps','rootkit','sqlattack','xterm'],'U2R',inplace=True)

# remove attribute 'difficulty_level'
data.drop(['difficulty_level'],axis=1,inplace=True)

# calling change_label() function
change_label(data)

# importing required libraries for normalizing data
from sklearn import preprocessing
from sklearn.preprocessing import StandardScaler

# selecting numeric attributes columns from data
numeric_col = data.select_dtypes(include='number').columns

# using standard scaler for normalizing
std_scaler = StandardScaler()
def normalization(df,col):
  for i in col:
    arr = df[i]
    arr = np.array(arr)
    df[i] = std_scaler.fit_transform(arr.reshape(len(arr),1))
  return df

# calling the normalization() function
data = normalization(data.copy(),numeric_col)

# selecting categorical data attributes
cat_col = ['protocol_type','service','flag']

# creating a dataframe with only categorical attributes
categorical = data[cat_col]

# one-hot-encoding categorical attributes using pandas.get_dummies() function
categorical = pd.get_dummies(categorical,columns=cat_col)

# creating a dataframe with multi-class labels (Dos,Probe,R2L,U2R,normal)
multi_data = data.copy()
multi_label = pd.DataFrame(multi_data.label)

# label encoding (0,1,2,3,4) multi-class labels (Dos,normal,Probe,R2L,U2R)
le2 = preprocessing.LabelEncoder()
enc_label = multi_label.apply(le2.fit_transform)
multi_data['intrusion'] = enc_label

np.save("D:/NIDS/ML_Projects/Network-Intrusion-Detection-Using-Machine-Learning/le2_classes.npy",le2.classes_,allow_pickle=True)

# one-hot-encoding attack label
multi_data = pd.get_dummies(multi_data,columns=['label'],prefix="",prefix_sep="") 
multi_data['label'] = multi_label

# creating a dataframe with only numeric attributes of multi-class dataset and encoded label attribute 
numeric_multi = multi_data[numeric_col]
numeric_multi['intrusion'] = multi_data['intrusion']

# finding the attributes which have more than 0.5 correlation with encoded attack label attribute 
corr = numeric_multi.corr()
corr_y = abs(corr['intrusion'])
highest_corr = corr_y[corr_y >0.5]
highest_corr.sort_values(ascending=True)

# selecting attributes found by using pearson correlation coefficient
numeric_multi = multi_data[['count','logged_in','srv_serror_rate','serror_rate','dst_host_serror_rate',
                        'dst_host_same_srv_rate','dst_host_srv_serror_rate','dst_host_srv_count','same_srv_rate']] 


# joining the selected attribute with the one-hot-encoded categorical dataframe
numeric_multi = numeric_multi.join(categorical)
# then joining encoded, one-hot-encoded, and original attack label attribute
multi_data = numeric_multi.join(multi_data[['intrusion','Dos','Probe','R2L','U2R','normal','label']])

# saving final dataset to disk
multi_data.to_csv('D:/NIDS/ML_Projects/Network-Intrusion-Detection-Using-Machine-Learning/datasets/multi_data.csv')

# final dataset for multi-class classification

from sklearn.metrics import accuracy_score # for calculating accuracy of model
from sklearn.model_selection import train_test_split # for splitting the dataset for training and testing
from sklearn.metrics import classification_report # for generating a classification report of model
import pickle # saving and loading trained model
from os import path

bin_data = pd.read_csv('D:/NIDS/ML_Projects/Network-Intrusion-Detection-Using-Machine-Learning/datasets/bin_data.csv')
bin_data.drop(bin_data.columns[0],axis=1,inplace=True)
multi_data = pd.read_csv('D:/NIDS/ML_Projects/Network-Intrusion-Detection-Using-Machine-Learning/datasets/multi_data.csv')
multi_data.drop(multi_data.columns[0],axis=1,inplace=True)
le1_classes_ = np.load('D:/NIDS/ML_Projects/Network-Intrusion-Detection-Using-Machine-Learning/labels/le1_classes.npy',allow_pickle=True)
le2_classes_ = np.load('D:/NIDS/ML_Projects/Network-Intrusion-Detection-Using-Machine-Learning/le2_classes.npy',allow_pickle=True)

X = multi_data.iloc[:,0:93].to_numpy() # dataset excluding target attribute (encoded, one-hot-encoded,original)
Y = multi_data['intrusion'] # target attribute

# splitting the dataset 75% for training and 25% testing
X_train, X_test, y_train, y_test = train_test_split(X,Y, test_size=0.1517, random_state=42)

# importing library for K-neares-neighbor classifier
from sklearn.neighbors import KNeighborsClassifier

knn=KNeighborsClassifier(n_neighbors=5)
knn.fit(X_train,y_train) # training model on training dataset

pkl_filename = "D:/NIDS/ML_Projects/Network-Intrusion-Detection-Using-Machine-Learning/models/knn_multi.pkl"
if(not path.isfile(pkl_filename)):
#   saving trained model to disk
    with open(pkl_filename, 'wb') as file:
        pickle.dump(knn, file)
# loading trained model from disk
    with open(pkl_filename, 'rb') as file:
        knn = pickle.load(file)

y_pred=knn.predict(X_test)  # predicting target attribute on testing dataset
ac=accuracy_score(y_test, y_pred)*100  # calculating accuracy of predicted data
print(ac)

# print('\n')
cust_multi_data = multi_data.iloc[125973:,0:93].to_numpy()
out = knn.predict(cust_multi_data)[0]
if(out==0):
    print("Multi Classification : DOS \n Binary Classification : Abnormal")
elif(out==1):
    print("Multi Classification : Probe \n Binary Classification : Abnormal")
elif(out==2):
    print("Multi Classification : R2L \n Binary Classification : Abnormal")
elif(out==3):
    print("Multi Classification : U2R \n Binary Classification : Abnormal")
elif(out==4):
    print("Normal")










