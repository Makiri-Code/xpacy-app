
export const URL = process.env.BACKEND_URL;
export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);


export const progress = (
    progressEvent, 
    onOpenModal, 
    onSetProgress, 
    onSetTime, 
    startTime
  ) => {
  onOpenModal(true);
  const percent = Math.round(
    (progressEvent.loaded * 100) / progressEvent.total
  );
  onSetProgress(percent);
  const currentTime = new Date();
  const timeElapsed = (startTime - currentTime) / 1000;
  const uploadSpeed = progressEvent.loaded / timeElapsed;
  const remainingBytes = progressEvent.total - progressEvent.loaded;
  const estimatedTime = (remainingBytes / uploadSpeed).toFixed(1);
  onSetTime(estimatedTime)
}

