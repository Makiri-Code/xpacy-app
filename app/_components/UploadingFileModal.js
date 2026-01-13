import { IoClose } from "react-icons/io5";
import CustomModal from "./CustomModal";

const UploadingFileModal = ({isOpenModal, setIsOpenModal, uploadingProgress, estimatedTime, controller}) => {
  return (
    <CustomModal isOpen={isOpenModal} isOpenChange={setIsOpenModal}>
        <CustomModal.Window>
          <div className="w-[330px] flex justify-center items-center flex-col gap-4 bg-white rounded-lg p-6 font-mono ">
            <h3 className="font-medium">Uploading..</h3>
            {/* Progress bar */}
            <div className="flex items-center gap-4">
              <div className="w-[186px] h-2 rounded-sm bg-indigo-50 flex items-start ">
                <div className=" h-2 rounded-sm bg-green-500" style={{ width: `${uploadingProgress}%` }}></div>
              </div>
              <span className="font-medium">{uploadingProgress}%</span>
            </div>
            <p className="text-sm">Estimated time: {Math.abs(estimatedTime)} secs</p>
            <div className="flex items-center justify-center">
              <button onClick={() => controller.abort()} className="flex items-center gap-2 cursor-pointer font-medium text-indigo-900 justify-center px-3 py-2 rounded-full border border-indigo-900">
                <span className="text-2xl"><IoClose /></span>
                <span>Cancel Upload</span>
              </button>
            </div>
          </div>
        </CustomModal.Window>
      </CustomModal>
  );
};

export default UploadingFileModal;