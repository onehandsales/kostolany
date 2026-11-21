import { LocalImageError } from '../../shared/media/localImage';
import { pickLocalImage } from '../../shared/media/pickLocalImage';
import { ProfilePhotoError, type ProfilePhotoPicker } from './profilePhoto';

export const pickProfilePhoto: ProfilePhotoPicker = async (origin, signal) => {
  try {
    const lease = await pickLocalImage(origin, signal, 768);
    return lease ? { photo: lease.image, release: lease.release } : null;
  } catch (error) {
    if (error instanceof LocalImageError) throw new ProfilePhotoError(error.reason);
    throw error;
  }
};
