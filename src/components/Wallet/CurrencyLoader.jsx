import React from 'react';
import { Circles } from 'react-loader-spinner';

export default function CurrencyLoader() {
  return (
    <div>
      <Circles
        height="60"
        width="60"
        color="#ffffff"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}