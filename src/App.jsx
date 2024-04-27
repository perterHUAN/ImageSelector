import React from 'react';
import ImagePreview from './ImagePreview';
import ImageSelector from './ImageSelector';

function App() {
  console.log('render App');
  const [drawInfo, setDrawInfo] = React.useState({
    img: null,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  function onChange(img, x, y, width, height) {
    setDrawInfo({ img, x, y, width, height });
  }
  return (
    <div className="flex flex-col gap-4 items-center">
      <ImageSelector
        imgSrc={
          'https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547_1280.jpg'
        }
        onChange={onChange}
      />
      <ImagePreview {...drawInfo} />
    </div>
  );
}

export default App;
