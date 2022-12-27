import UploadFileFactoryHandler from "../../../utils/multer/uploadFileFactoryHandler";

export default {
    uploadFile: function(){
        return UploadFileFactoryHandler.getUploadMiddleware(
            'userFiles',
            'userFiles',
            undefined,
            undefined,
            { files: 4 },
            false
        )
    }
}