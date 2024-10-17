import * as React from "react";
import { QRCanvas } from "qrcanvas-react";
import { ActionButton } from "@fluentui/react/lib/components/Button/ActionButton/ActionButton";
import {
  DefaultButton,
  PrimaryButton,
  CommandButton,
} from "@fluentui/react/lib/Button";
import { Panel, PanelType } from "@fluentui/react/lib/Panel";
import { IIconProps } from "@fluentui/react/lib/components/Icon/Icon.types";
import { useBoolean } from "@fluentui/react-hooks";
import { useReactToPrint } from "react-to-print";
import { Stack } from "@fluentui/react";
import { IStackTokens, IStackItemStyles } from "@fluentui/react";

export interface IQRCodeGenrops {
  // These are set based on the toggles shown above the examples (not needed in real code)
  buttonValue: string;
  buttonLink: string;
}

const buttonStyles = { root: { marginRight: 8 } };
let canvasRef: QRCanvas;

export const ButtonAnchor: React.FunctionComponent<IQRCodeGenrops> = (
  props
) => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] =
    useBoolean(false);

  const options = { size: 250, data: props.buttonLink };

  const printRef = React.useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef: printRef });

  const printIcon: IIconProps = { iconName: "Print" };

  const horizontalGapStack: IStackTokens = {
    childrenGap: 10,
    padding: 10,
  };

  const stackItemStyles: IStackItemStyles = {
    root: {
      alignItems: "center",
      display: "flex",
      height: 50,
      justifyContent: "center",
      overflow: "hidden",
    },
  };

  const onRenderFooterContent = React.useCallback(
    () => (
      <Stack horizontal tokens={horizontalGapStack}>
        <Stack.Item grow styles={stackItemStyles} align="center">
          <PrimaryButton
            href={_getImageUri()}
            styles={buttonStyles}
            download={true}
          >
            Download
          </PrimaryButton>
        </Stack.Item>
        <Stack.Item grow styles={stackItemStyles} align="center">
          <ActionButton iconProps={printIcon} onClick={(e) => reactToPrintFn()}>
            Print
          </ActionButton>
        </Stack.Item>
        <Stack.Item grow styles={stackItemStyles} align="center">
          <DefaultButton
            styles={{ root: { padding: 0, minWidth: 64 } }}
            onClick={dismissPanel}
          >
            Cancel
          </DefaultButton>
        </Stack.Item>
      </Stack>
    ),
    [dismissPanel]
  );

  const qrIcon: IIconProps = { iconName: "QRCode" };

  const isMinWidthExceeded = (window.innerWidth * 20) / 100 > 345;

  return (
    <div>
      <ActionButton
        text={"Extract QR-Code"}
        onClick={openPanel}
        iconProps={qrIcon}
      />
      <Panel
        isOpen={isOpen}
        onDismiss={dismissPanel}
        headerText="QR Code Generated"
        closeButtonAriaLabel="Close"
        type={PanelType.custom}
        customWidth={isMinWidthExceeded ? "20vw" : "345px"}
        onRenderFooterContent={onRenderFooterContent}
        isFooterAtBottom={true}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
            height: "100%",
            alignItems: "center",
            paddingTop: "20vh",
          }}
          ref={printRef}
        >
          <QRCanvas
            ref={(elm: QRCanvas) => {
              canvasRef = elm;
            }}
            options={options}
          />
        </div>
      </Panel>
    </div>
  );
};

function _getImageUri(): string {
  if (canvasRef != null) {
    const canvas: HTMLCanvasElement = canvasRef["canvas"];
    const dataUri = canvas.toDataURL("image/png");
    return dataUri;
  }
  return "";
}
