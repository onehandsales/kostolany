import type { ImageSourcePropType } from 'react-native';
import type { AppIconId } from './types';
export const iconOptions: readonly { id: AppIconId; label: string; image: ImageSourcePropType }[] = [
  {
    id: 'wordmark-black',
    label: 'Wordmark Black',
    image: require('../../../assets/app-icons/wordmark-black.png'),
  },
  {
    id: 'wordmark-white',
    label: 'Wordmark White',
    image: require('../../../assets/app-icons/wordmark-white.png'),
  },
  {
    id: 'founder-black',
    label: "Founder's Choice Black",
    image: require('../../../assets/app-icons/founder-black.png'),
  },
  {
    id: 'founder-white',
    label: "Founder's Choice White",
    image: require('../../../assets/app-icons/founder-white.png'),
  },
  { id: 'friend', label: 'Friend Tier', image: require('../../../assets/app-icons/friend.png') },
  {
    id: 'throwback-2012',
    label: 'Throwback 2012',
    image: require('../../../assets/app-icons/throwback-2012.png'),
  },
  {
    id: 'throwback-2015',
    label: 'Throwback 2015',
    image: require('../../../assets/app-icons/throwback-2015.png'),
  },
  {
    id: 'throwback-2017',
    label: 'Throwback 2017',
    image: require('../../../assets/app-icons/throwback-2017.png'),
  },
];
