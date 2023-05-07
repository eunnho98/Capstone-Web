import { Icon } from '@chakra-ui/react';
import { MdEmail, MdKey } from 'react-icons/md';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export function EmailIcon() {
  return <Icon as={MdEmail} />;
}

export function KeyIcon() {
  return <Icon as={MdKey} />;
}

export function EyeIcon() {
  return <Icon as={FaEye} />;
}

export function EyeCloseIcon() {
  return <Icon as={FaEyeSlash} />;
}
