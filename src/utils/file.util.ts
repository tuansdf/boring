export const downloadFile = (file: File) => {
  const url = window.URL.createObjectURL(new Blob([file]));
  const anchorEl = document.createElement("a");
  anchorEl.href = url;
  anchorEl.setAttribute("download", file.name);
  anchorEl.click();
};
