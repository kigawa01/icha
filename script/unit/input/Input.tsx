import {InputHTMLAttributes} from "react";
import {css} from "@emotion/react";
import {useStyle} from "../../util/style/styleHook.tsx";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  padY?: number | undefined;
  padX?: number | undefined;
  fontSize?: string | undefined;
  onComplete?: () => void;
}

export function Input(props: InputProps) {
  const {
    padX,
    padY,
    fontSize,
    onComplete,
    ...parentProps
  } = props;
  const style = useStyle();
  const padYUse = padY || 3 ;
  const padXUse = padX || (padYUse * 2);
  const fontSizeUse = fontSize || style.fontSize;

  return <input
    {...parentProps}
    css={css`
      padding: ${padYUse}px ${padXUse}px;
      font-size: ${fontSizeUse};
      line-height: 1;
      border: 1px solid ${style.line};
      border-radius: 5px;
    `}
    onKeyDown={event => {
      if (onComplete != undefined) {
        if (event.key != "Enter") return;
        if (event.nativeEvent.isComposing) return;
        onComplete();
      }
    }}
  />;
}