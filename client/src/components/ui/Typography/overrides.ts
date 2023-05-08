import {mergeOverrides} from 'baseui';
import {Overrides} from 'baseui/overrides';
import {TypographyProps} from '.';
import {STYLES} from './config';

type DefaultStyles = {
  fontSize: [string, string];
  lineHeight: string | number;
  tag: keyof JSX.IntrinsicElements;
};

export const overrides = ({type, size, ...rest}: Omit<TypographyProps, 'children'>) => {
  const {fontWeight} = STYLES[type];
  const {fontSize, lineHeight = 'initial', tag} = STYLES[type][size] as DefaultStyles;

  const {
    fontSize: propsFontSize,
    lineHeight: propsLineHeight,
    fontWeight: propsFontWeight,
    textTransform = 'inherit',
    textDecoration = 'inherit',
    textAlign = 'start',
    href,
    margin,
    marginTop = 0,
    marginBottom = 0,
    marginLeft = 0,
    marginRight = 0,
    as: propsAs,
    overrides: propsOverrides,
    ...restProps
  } = rest;

  const getDesiredFontSize = (viewport: 'MOBILE' | 'DESKTOP') => {
    if (propsFontSize) {
      if (Array.isArray(propsFontSize)) {
        return propsFontSize[viewport === 'DESKTOP' ? 0 : 1];
      }
      return propsFontSize;
    }

    return fontSize[viewport === 'DESKTOP' ? 0 : 1];
  };

  const getMarginStyle = () => {
    if (margin) {
      return {margin: margin};
    }
    return {
      marginTop: marginTop,
      marginBottom: marginBottom,
      marginLeft: marginLeft,
      marginRight: marginRight,
    };
  };

  return {
    overrides: mergeOverrides(
      {
        Block: {
          style: {
            textOverflow: 'inherit',
            overflow: 'inherit',
            fontSize: getDesiredFontSize('DESKTOP'),
            lineHeight: propsLineHeight || lineHeight,
            fontWeight: propsFontWeight || fontWeight,
            textTransform: textTransform,
            textDecoration: textDecoration,
            textAlign: textAlign,
            cursor: href || restProps?.onClick ? 'pointer' : 'inherit',
            ...getMarginStyle(),
            '@media (max-width: 768px)': {
              fontSize: getDesiredFontSize('MOBILE'),
            },
          },
        },
      } as Overrides<unknown>,
      propsOverrides as Overrides<unknown>,
    ),
    ...restProps,
    as: propsAs || tag,
  };
};
