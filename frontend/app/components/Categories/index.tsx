import Category from "../Category";

export type ICategory = {
  title: string;
  href: string;
};

type IProps = {
  categories: ICategory[];
};

const Categories = (props: IProps) => {
  const { categories } = props;
  return (
    <div className="flex flex-col gap-2.5">
      {categories.map((category) => {
        return (
          <Category key={category.title} {...category}>
            {category.title}
          </Category>
        );
      })}
    </div>
  );
};

export default Categories;
