import * as React from "react";
import { SxProps } from "@mui/system";
import { Theme } from "..";
import { TransitionProps } from "../transitions/transition";
import { AccordionClasses } from "./accordionClasses";
import { OverridableComponent, OverrideProps } from "../OverridableComponent";
import { ExtendPaperTypeMap } from "../Paper/Paper";
import { CreateSlotsAndSlotProps, SlotProps } from "../utils/types";

export interface AccordionSlots {
  /**
   * The component that renders the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Collapse
   */
  transition?: React.JSXElementConstructor<
    TransitionProps & { children?: React.ReactElement<any, any> }
  >;
}
