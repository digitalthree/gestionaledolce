import ReactS3Client from 'react-aws-s3-typescript';
import {s3, s3Config} from './s3Config';


export const uploadFileS3 = async (file: File) => {
    const s3 = new ReactS3Client(s3Config);
    try {
        return await s3.uploadFile(file)
    } catch (exception) {
        console.log(exception);
    }
}

export const deleteFileS3 = async () => {
    const s3 = new ReactS3Client(s3Config);
    try {
        s3.listFiles().then(res => {
            if(res.data.Contents.length === 1){
                s3.deleteFile(res.data.Contents[0].Key)
            }
        })

    } catch (exception) {
        console.log(exception);
    }
    return false
}

export const getFileFromS3 = async () => {
    const s3 = new ReactS3Client(s3Config);
    try {
        return await s3.listFiles().then(res => {
            console.log(res.data)
            if(res.data.Contents.length === 1){
                return res.data.Contents[0].Key as string
            }else{
                return ""
            }
        })
    } catch (exception) {
        console.log(exception);
        return ""
    }
}