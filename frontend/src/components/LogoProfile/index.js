import React from 'react';

export default function LogoProfile() {
  const name = localStorage.getItem('name');
  const imgSrc = '';

  const getRandomColor = () => {
    const hex = ((Math.random() * 0xffffff) << 0).toString(16);
    const color = `#${hex}`;
    return color;
  };

  const getInitials = (name) => {
    let initials;
    const nameSplit = name.split(' ');
    const nameLength = nameSplit.length;
    if (nameLength > 1) {
      initials =
        nameSplit[0].substring(0, 1) +
        nameSplit[nameLength - 1].substring(0, 1);
    } else if (nameLength === 1) {
      initials = nameSplit[0].substring(0, 1);
    } else return;

    return initials.toUpperCase();
  };

  const createImageFromInitials = (size, name, color) => {
    if (name == null) return;
    name = getInitials(name);

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = canvas.height = size;

    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, size, size);

    context.fillStyle = `${color}50`;
    context.fillRect(0, 0, size, size);

    context.fillStyle = color;
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.font = `${size / 2}px Roboto`;
    context.fillText(name, size / 2, size / 2);

    return canvas.toDataURL();
  };

  return (
    <>
      <img
        style={{
          borderRadius: '100px',
          maxWidth: '100px',
        }}
        id="preview"
        src={
          imgSrc.length <= 0
            ? createImageFromInitials(500, name, getRandomColor())
            : imgSrc
        }
        alt="logo-profile"
      />
    </>
  );
}
