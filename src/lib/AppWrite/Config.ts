// import {Client , Account , Databases , Storage , Avatars } from 'appwrite'

import { Account, Avatars, Client, Databases, Storage } from "appwrite";


// export const appwriteConfig={
//     projectId:'67389082002b6fbfe9ba',
//     url:'https://cloud.appwrite.io/v1'
// }
// export const client=new Client()
// client.setProject(appwriteConfig.projectId)
// client.setEndpoint(appwriteConfig.url)
// export const account=new Account(client)
// export const databases=new Databases(client)
// export const storage=new Storage(client)
// export const avtares=new Avatars(client)






export let projectConfig={
    projectId:'67389082002b6fbfe9ba',
    url:'https://cloud.appwrite.io/v1',
    storageid:'673a7aa3000b524f3231',
    databasid:'673a7add002858e09e10',
    postsid:'673a7b2d00040955bd15',
    usersid:'673a7bb70030cdfac3d1',
    savesid:'673a7bd00007213e62bf',
    commentid:'674c7eb6002185ae3717'
}





export const client =new Client()
client.setEndpoint(projectConfig.url)
client.setProject(projectConfig.projectId)
export const account =new Account(client)
export const databases =new Databases(client)
export const storage =new Storage(client)
export const avaters =new Avatars(client)


