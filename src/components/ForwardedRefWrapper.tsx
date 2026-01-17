import { ElementType, ForwardedRef, forwardRef } from "react";
import { ChildProps } from "./types";

const ForwardedRefWrapper = forwardRef(
  <T extends ElementType>(
    { as, children, data, className, id, ...rest }: ChildProps<T>,
    ref: ForwardedRef<HTMLElement>
  ) => {
    const Component = as || "section";
    return (
      <Component
        id={id}
        data-index={data}
        className={className}
        {...rest}
        ref={ref}
      >
        {children}
      </Component>
    );
  }
);

export default ForwardedRefWrapper;
