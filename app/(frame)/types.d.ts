import type { IconType } from "react-icons";

type ItemIcon = {
  Icon: IconType;
  title: string;
  description: string;
};

type ItemImageParagraph = {
  image: {
    src: string;
    height: number;
    width: number;
    alt: string;
  };
  title: string;
  description: string;
  paragarph: true;
  
};

type ItemImageLink = {
  image: {
    src: string;
    height: number;
    width: number;
    alt: string;
  };
  title: string;
  description: string;
  paragarph: false;
  link: string;
}

type ItemImage = ItemImageParagraph | ItemImageLink;