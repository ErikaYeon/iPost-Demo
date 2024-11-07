// CrownIcon.js
import React from 'react';
import CrownGrey from '../../assets/images/icons/gamif_crown_0_1.svg';
import CrownBronze from '../../assets/images/icons/gamif_crown_1.svg';
import CrownSilver from '../../assets/images/icons/gamif_crown_2.svg';
import CrownGold from '../../assets/images/icons/gamif_crown_3.svg';

const CrownIcon = ({ type, width = 15, height = 15, style }) => {
  switch (type) {
    case 'grey':
      return <CrownGrey width={width} height={height} style={style} />;
    case 'bronze':
      return <CrownBronze width={width} height={height} style={style} />;
    case 'silver':
      return <CrownSilver width={width} height={height} style={style} />;
    case 'gold':
      return <CrownGold width={width} height={height} style={style} />;
    default:
      return null;
  }
};

export default CrownIcon;
