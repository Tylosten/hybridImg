import React, { useState } from 'react';
import ImgGrid from './ImgGrid';

export function App({ initialData }) {
  const lineThemes = [
    'Sucette',
    'arc-en-ciel',
    'Pingouin',
    'Mammouth',
    'Espace',
    'Spaghetti',
  ];
  const colThemes = [
    'Papier toilette',
    'Cataclysme',
    'Cookie',
    'Chaussette',
    'Abeille',
    'Rococo',
  ];

  return (
    <>
      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{initialData.appName}</h1>
            <h2 className="subtitle">
              Ici vous pouvez uploader vos fabuleux dessins.
            </h2>
          </div>
        </div>
      </section>

      <ImgGrid colThemes={colThemes} lineThemes={lineThemes} edit={true} />
    </>
  );
}
