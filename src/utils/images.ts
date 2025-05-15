const MAX_WIDTH = 1024;
const MAX_HEIGHT = 1024;
const MIME_TYPE = "image/jpeg";
const QUALITY = 0.75;

export const ACCEPT_IMGS = ".png,.jpeg,.jpg,.webp,.avif,.svg";

function calculateImgSize(
  img: HTMLImageElement,
  maxWidth: number = MAX_WIDTH,
  maxHeight: number = MAX_HEIGHT,
) {
  let width = img.width;
  let height = img.height;

  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
  } else {
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height);
      height = maxHeight;
    }
  }
  return [width, height];
}

export function compressImage(file: File): Promise<string> {
  // compress only .jpeg, .jpg and .png files
  const imgBlobUrl = URL.createObjectURL(file);
  if (
    file.type === "image/jpeg" ||
    file.type === "image/jpg" ||
    file.type === "image/png"
  ) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imgBlobUrl;
      img.onerror = function () {
        // resolve with original image URL in case of error;
        console.error("Error loading image");
        resolve(imgBlobUrl);
        // Handle the failure properly
      };
      img.onload = function () {
        const [newWidth, newHeight] = calculateImgSize(img);
        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          console.error("Cannot create 2d canvas context");
          resolve(imgBlobUrl);
          return;
        }
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, newWidth, newHeight);
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              console.error("Cannot convert to blob");
              resolve(imgBlobUrl);
              return;
            }
            URL.revokeObjectURL(imgBlobUrl);
            const newFileUrl = URL.createObjectURL(blob);
            resolve(newFileUrl);
          },
          MIME_TYPE,
          QUALITY,
        );
      };
    });
  } else {
    return Promise.resolve(imgBlobUrl);
  }
}
