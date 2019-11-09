import React from 'react';

const RobotFrame = ({ children }) => {
  return (
    <div className="frame">
      <div className="header">
        <h1>Woppy's</h1>
        <h2>weather webpage</h2>
      </div>
      {children}
      <div>
        <p>Find out what woppy is on the <a href="https://coxncrendor.fandom.com/wiki/Woppy_the_Weatherbot">CnC fandom page</a></p>
        <p>ZIP Code Database provided by <a href="https://simplemaps.com/data/us-zips">simplemaps.comv</a></p>
      </div>
      <style jsx>{`
        .frame {
          width: 90%;
          margin: 0 auto;
        }
        .header {
          display: flex;
          align-items: flex-end;
          margin-bottom: .8rem;
        }
        h1, h2 {
          margin: 0;
          padding: 0;
        }
        h1 {
          font-size: 2rem;
          padding-right: .5rem;
        }
        h2 {
          font-size: 1.3rem;
        }
      `}</style>
    </div>
  );
};

export default RobotFrame;