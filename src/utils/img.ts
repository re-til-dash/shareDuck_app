import { uploadImg } from "../apis/posts/createPost";

interface UploadedImage {
  originalSrc: string;
  newUrl: string;
}

export const processAndUploadPost = async (
  htmlContent: string,
  postId: number
): Promise<string> => {
  const imgRegex = /<img[^>]+src="([^">]+)"/g;

  const uploadImage = async (base64Image: string): Promise<string> => {
    // Base64 문자열을 Blob으로 변환
    const fetchResponse = await fetch(base64Image);
    const blob = await fetchResponse.blob();

    // Blob을 File 객체로 변환
    const file = new File([blob], "image.png", { type: blob.type });

    // 수정된 uploadImg 함수 호출
    return await uploadImg(file, postId);
  };

  let match;
  const uploadedImages: UploadedImage[] = [];

  while ((match = imgRegex.exec(htmlContent)) !== null) {
    const originalSrc = match[1];
    try {
      const newUrl = await uploadImage(originalSrc);
      uploadedImages.push({ originalSrc, newUrl });
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  let processedHtml = htmlContent;
  uploadedImages.forEach(({ originalSrc, newUrl }) => {
    processedHtml = processedHtml.replace(
      new RegExp(`<img[^>]+src="${escapeRegExp(originalSrc)}"`, "g"),
      `<img src="${newUrl}"`
    );
  });

  return processedHtml;
};

// 정규표현식 특수문자 이스케이프 함수
const escapeRegExp = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
