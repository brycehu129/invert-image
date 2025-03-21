export const invertImage = async (imageData: File | string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    img.onload = () => {
      try {
        // 设置画布尺寸与图片相同
        canvas.width = img.width;
        canvas.height = img.height;

        // 绘制原始图片
        if (!ctx) throw new Error('Failed to get canvas context');
        ctx.drawImage(img, 0, 0);

        // 获取图片数据
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // 反转颜色
        for (let i = 0; i < data.length; i += 4) {
          data[i] = 255 - data[i];         // 红色
          data[i + 1] = 255 - data[i + 1]; // 绿色
          data[i + 2] = 255 - data[i + 2]; // 蓝色
          // data[i + 3] 是透明度，保持不变
        }

        // 将处理后的数据放回画布
        ctx.putImageData(imageData, 0, 0);

        // 转换为 Blob
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to convert canvas to blob'));
          }
        }, 'image/png');

      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    // 设置图片源
    if (typeof imageData === 'string') {
      img.src = imageData;
    } else {
      img.src = URL.createObjectURL(imageData);
    }
  });
}; 