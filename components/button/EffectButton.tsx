import React from "react";

const defaultClass = "flex p-2 rounded items-center";
const effectClass = "color-effect";

interface Props {
  children: React.ReactNode;
  value: string;
  [key: string]: any;
}

export const EffectButton = React.forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
  const [className, setClassName] = React.useState<string>(defaultClass);
  const [currentValue, setCurrentValue] = React.useState<string>(props.value);

  const { children, value, ...rest } = props;

  React.useEffect(() => {
    if (props.value !== currentValue) {
      {
        setClassName(addClassName(className));
        setCurrentValue(props.value);
      }

      const timeout = setTimeout(() => {
        setClassName(defaultClass);
        clearTimeout(timeout);
      }, 1000)
    }
  }, [props.value, className, currentValue, setClassName, setCurrentValue]);

  return (
    <div className={className} ref={ref} {...rest}>
      {children}
    </div>
  );
});

const addClassName = (str: string): string => {
  const spl = str.split(" ");

  if (!spl.includes(effectClass)) {
    spl.push(effectClass);
  }

  return spl.join(" ");
};
