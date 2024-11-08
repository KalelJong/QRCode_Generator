import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ButtonAnchor } from "./App/Component/QRCodeGenerator";
import { IQRCodeGenProps } from "./App/Component/Component.types";

export class QRCodeGenerator
  implements ComponentFramework.ReactControl<IInputs, IOutputs>
{
  private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
  private notifyOutputChanged: () => void;
  private theContainer: HTMLDivElement;
  // private props: IQRCodeGenProps = {
  //   //tableValue: this.numberFacesChanged.bind(this),
  //   buttonValue: "",
  //   buttonLink: "",
  //   infoLabels: {
  //     name: null,
  //     category: null,
  //     parentAsset: null,
  //     product: null,
  //   },
  // };

  /**
   * Empty constructor.
   */
  constructor() {}

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary
  ): void {
    this.notifyOutputChanged = notifyOutputChanged;
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   * @returns ReactElement root react element for the control
   */
  public updateView(
    context: ComponentFramework.Context<IInputs>
  ): React.ReactElement {
    const buttonValue = context.parameters.buttonValue.raw!;
    const buttonLink =
      context.parameters.QRCodeLink.raw! === null
        ? window.location.href
        : context.parameters.QRCodeLink.raw!;
    const name = context.parameters.name?.raw;

    const category = context.parameters.category?.raw;

    const parentAsset = context.parameters.parentAsset?.raw;

    const product = context.parameters.product?.raw;

    const props: IQRCodeGenProps = {
      buttonValue,
      buttonLink,
      infoLabels: { name, category, parentAsset, product },
    };
    return React.createElement(ButtonAnchor, props);
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
   */
  public getOutputs(): IOutputs {
    return {};
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
  }
}
