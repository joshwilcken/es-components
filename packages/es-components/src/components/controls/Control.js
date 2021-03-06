import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { useTheme } from '../util/useTheme';
import ValidationContext from './ValidationContext';
import OrientationContext from './OrientationContext';

const FlexControl = styled.div`
  color: ${props => props.textColor};
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-bottom: 25px;

  >[role="group"] {
    margin-bottom: 0;
  }

  select {
    border-color: ${props => props.borderColor};
    box-shadow: ${props => props.boxShadow};
  }

  input:focus,
  select:focus {
    border-color: ${props => props.focusBorderColor};
    box-shadow: ${props => props.focusBoxShadow};
  }

  ${props =>
    props.hasValidationBorder &&
    props.validationState !== 'default' &&
    css`
      border-bottom: 2px solid ${props.theme.colors.gray4};
      box-shadow: inset 0 7px 6px -6px ${props.textColor};
      padding: 15px ${props.borderOffset};
      margin-left: -${props.borderOffset};
      margin-right: -${props.borderOffset};
    `}
  }

  ${props =>
    props.layoutOrientation === 'inline' &&
    css`
      @media (min-width: ${props.theme.screenSize.tablet}) {
        align-items: baseline;
        flex-direction: row;
      }
    `};
`;

function Control(props) {
  const {
    validationState,
    hasValidationBorder,
    orientation,
    borderOffset,
    children,
    ...other
  } = props;
  const theme = useTheme();
  const textColor = theme.validationTextColor[validationState];

  return (
    <OrientationContext.Provider value={orientation}>
      <FlexControl
        textColor={textColor}
        borderOffset={borderOffset}
        validationState={validationState}
        {...theme.validationInputColor[validationState]}
        layoutOrientation={orientation}
        hasValidationBorder={hasValidationBorder}
        {...other}
      >
        <ValidationContext.Provider value={validationState}>
          {children}
        </ValidationContext.Provider>
      </FlexControl>
    </OrientationContext.Provider>
  );
}

Control.propTypes = {
  orientation: PropTypes.oneOf(['stacked', 'inline']),
  validationState: PropTypes.oneOf(['default', 'success', 'warning', 'danger']),
  /** Apply a top/bottom validation border to a control (usually checkbox/radios)  */
  hasValidationBorder: PropTypes.bool,
  /** Set the border offset to match container padding */
  borderOffset: PropTypes.string,
  children: PropTypes.node
};

Control.defaultProps = {
  orientation: 'stacked',
  validationState: 'default',
  hasValidationBorder: false,
  borderOffset: '15px',
  children: null
};

export default Control;
