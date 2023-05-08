import React from 'react';

import {Modal as BaseModal, ModalProps} from 'baseui/modal';
import {Block} from 'baseui/block';
import {FiX} from 'react-icons/fi';
import {Heading} from '../Typography';
import {Button} from '../Buttons';
import {mergeOverrides, useStyletron} from 'baseui';
import {Overrides} from 'baseui/overrides';

type Props = ModalProps & {
  title?: React.ReactNode;
};

type ModalPartProps = React.ComponentProps<typeof Block>;

export const Modal = ({
  children,
  title,

  size = 'default',
  overrides: propsOverrides,
  ...rest
}: Props) => {
  const [, theme] = useStyletron();

  return (
    <BaseModal
      {...rest}
      overrides={mergeOverrides(
        {
          Dialog: {
            style: () => ({
              backgroundColor: 'white',
              ...(size === 'default' && {
                width: 'clamp(330px, 775px, 775px)',
              }),
              padding: '32px',
            }),
          },
          Close: () => null,
        },
        propsOverrides as Overrides<unknown>,
      )}
    >
      {(title || rest.closeable) && (
        <Block display="flex" justifyContent="space-between" alignItems="center">
          <Heading.Medium fontSize={['24px', '16px']}>{title}</Heading.Medium>
          {rest.onClose && (
            <Button
              kind="transparent"
              shape="square"
              onClick={() => rest.onClose({closeSource: 'closeButton'})}
            >
              <FiX size="32px" color={theme.colors.mono500} />
            </Button>
          )}
        </Block>
      )}
      {children}
    </BaseModal>
  );
};

export const ModalHeader = ({children, ...rest}: ModalPartProps) => {
  return (
    <Block flex={1} maxHeight="max-content" {...rest}>
      {children}
    </Block>
  );
};

export const ModalBody = ({children, ...rest}: ModalPartProps) => {
  return (
    <Block flex={1} {...rest}>
      {children}
    </Block>
  );
};

export const ModalFooter = ({children, ...rest}: ModalPartProps) => {
  return (
    <Block flex={1} maxHeight="max-content" {...rest}>
      {children}
    </Block>
  );
};
