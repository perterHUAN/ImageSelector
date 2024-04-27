import React from 'react';
function ImagePreview({ img, x, y, width, height }) {
  const previewRef = React.useRef();
  React.useEffect(() => {
    if (!img) return;
    const ctx = previewRef.current.getContext('2d');
    if (!previewRef.current.height || !previewRef.current.width) {
      const cls = getComputedStyle(previewRef.current);
      previewRef.current.height = +cls.height.replace('px', '');
      previewRef.current.width = +cls.width.replace('px', '');
    }
    ctx.drawImage(
      img,
      x,
      y,
      width,
      height,
      0,
      0,
      previewRef.current.width,
      previewRef.current.height
    );
  }, [previewRef, img, x, y, width, height]);
  return (
    <div class="flex flex-col items-center justify-center gap-5">
      <canvas
        ref={previewRef}
        className="rounded-full bg-red-50"
        width="96"
        height="96"
      ></canvas>
      <p class="">当前头像</p>
    </div>
  );
}

export default ImagePreview;
