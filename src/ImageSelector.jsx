import React from 'react';
function ImageSelector({ imgSrc, onChange }) {
  const [press, setPress] = React.useState({
    topLeft: false,
    topRight: false,
    bottomLeft: false,
    bottomRight: false,
    other: false,
  });
  const [mousPosition, setMousePosition] = React.useState(null);
  const [selector, setSelector] = React.useState({
    x: 0,
    y: 0,
    width: null,
    height: null,
  });
  const imgRef = React.useRef();
  const selectorRef = React.useRef();

  React.useEffect(() => {
    imgRef.current.xScale = imgRef.current.naturalWidth / imgRef.current.width;
    imgRef.current.yScale =
      imgRef.current.naturalHeight / imgRef.current.height;
    const cls = getComputedStyle(selectorRef.current);
    const selectorWidth = +cls.width.replace('px', '');
    const selectorHeight = +cls.height.replace('px', '');

    selectorRef.current.width = selectorWidth;
    selectorRef.current.height = selectorHeight;
    setSelector({
      ...selector,
      width: selectorWidth,
      height: selectorHeight,
    });
  }, [imgRef, selectorRef]);

  function handleMouseDown(event) {
    if (event.target === event.currentTarget) {
      setPress({
        ...press,
        other: true,
      });
    }
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  }
  function handleMouseUp(event) {
    setPress({
      topLeft: false,
      topRight: false,
      bottomLeft: false,
      bottomRight: false,
      other: false,
    });
  }
  function handleMouseMove(event) {
    if (Object.values(press).every((e) => !e)) return;

    const { clientX, clientY } = event;

    const offsetX = clientX - mousPosition.x;
    const offsetY = clientY - mousPosition.y;

    let newX;
    let newY;
    let newWidth;
    let newHeight;

    if (press.topLeft) {
      newX = selector.x + offsetX;
      newY = selector.y + offsetY;
      newWidth = selector.width - offsetX;
      newHeight = selector.height - offsetY;
      if (newWidth <= 0 || newHeight <= 0) {
        setPress({
          ...press,
          topLeft: false,
          bottomRight: true,
        });
      }
    } else if (press.topRight) {
      newX = selector.x;
      newY = selector.y + offsetY;
      newWidth = selector.width + offsetX;
      newHeight = selector.height - offsetY;
      if (newWidth <= 0 || newHeight <= 0) {
        setPress({
          ...press,
          topRight: false,
          bottomLeft: true,
        });
      }
    } else if (press.bottomLeft) {
      newX = selector.x + offsetX;
      newY = selector.y;
      newWidth = selector.width - offsetX;
      newHeight = selector.height + offsetY;
      if (newWidth <= 0 || newHeight <= 0) {
        setPress({
          ...press,
          bottomLeft: false,
          topRight: true,
        });
      }
    } else if (press.bottomRight) {
      newX = selector.x;
      newY = selector.y;
      newWidth = selector.width + offsetX;
      newHeight = selector.height + offsetY;
      if (newWidth <= 0 || newHeight <= 0) {
        setPress({
          ...press,
          bottomRight: false,
          topLeft: true,
        });
      }
    } else {
      newX = selector.x + offsetX;
      newY = selector.y + offsetY;
      newHeight = selector.height;
      newWidth = selector.width;
    }

    if (newX + selector.width > imgRef.current.width)
      newX = imgRef.current.width - selector.width;
    if (newX < 0) newX = 0;
    if (newY + selector.height > imgRef.current.height)
      newY = imgRef.current.height - selector.height;
    if (newY < 0) newY = 0;

    if (newHeight < 0) newHeight = 0;
    if (newWidth < 0) newWidth = 0;
    setSelector({
      ...selector,
      x: newX,
      y: newY,
      width: newWidth,
      height: newHeight,
    });
    onChange(
      imgRef.current,
      newX * imgRef.current.xScale,
      newY * imgRef.current.yScale,
      selector.width * imgRef.current.xScale,
      selector.height * imgRef.current.yScale
    );
    setMousePosition({ x: clientX, y: clientY });
  }
  return (
    <div className="w-52 h-52 bg-gray-50 flex flex-col justify-center items-center">
      <div className="relative">
        <img src={imgSrc} ref={imgRef} />
        <div
          className="absolute w-24 h-24 border-red-100 bg-transparent border-2 hover:cursor-move"
          style={{
            left: selector.x + 'px',
            top: selector.y + 'px',
            width: selector.width + 'px',
            height: selector.height + 'px',
          }}
          ref={selectorRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div
            className="absolute w-2 h-2 border-red-100 bg-transparent border-2 -top-2 -left-2 cursor-nwse-resize"
            onMouseDown={() => setPress({ ...press, topLeft: true })}
          ></div>
          <div
            className="absolute w-2 h-2 border-red-100 bg-transparent border-2 -top-2 -right-2 cursor-nesw-resize"
            onMouseDown={() => setPress({ ...press, topRight: true })}
          ></div>
          <div
            className="absolute w-2 h-2 border-red-100 bg-transparent border-2 -bottom-2 -left-2 cursor-nesw-resize"
            onMouseDown={() => setPress({ ...press, bottomLeft: true })}
          ></div>
          <div
            className="absolute w-2 h-2 border-red-100 bg-transparent border-2 -bottom-2 -right-2 cursor-nwse-resize"
            onMouseDown={() => setPress({ ...press, bottomRight: true })}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default ImageSelector;
