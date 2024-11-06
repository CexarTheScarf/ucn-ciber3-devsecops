type AsideProps = {
  title: string;
  href: string;
  description: string;
  children?: Omit<AsideProps, "children">[];
  hasSlug?: boolean;
};
