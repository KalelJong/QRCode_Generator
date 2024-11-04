import * as React from "react";
import { QRCanvas } from "qrcanvas-react";
import { ActionButton } from "@fluentui/react/lib/components/Button/ActionButton/ActionButton";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import { Panel, PanelType } from "@fluentui/react/lib/Panel";
import { IIconProps } from "@fluentui/react/lib/components/Icon/Icon.types";
import { useBoolean } from "@fluentui/react-hooks";
import { useReactToPrint } from "react-to-print";
import { Stack } from "@fluentui/react";
import { IStackTokens, IStackItemStyles } from "@fluentui/react";
import { IQRCodeGenProps } from "./Component.types";
import html2canvas from "html2canvas";

const buttonStyles = { root: { marginRight: 8 } };

export const ButtonAnchor: React.FunctionComponent<IQRCodeGenProps> = (
  props
) => {
  const { name, product, category, parentAsset } = props.infoLabels;
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

  const qrIcon: IIconProps = { iconName: "QRCode" };

  const isMinWidthExceeded = (window.innerWidth * 20) / 100 > 345;

  const handleDownload = async () => {
    if (printRef.current) {
      const canvas = await html2canvas(printRef.current);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "QRCode_with_Label.png";
      link.click();
    }
  };

  const onRenderFooterContent = React.useCallback(
    () => (
      <Stack horizontal tokens={horizontalGapStack}>
        <Stack.Item grow styles={stackItemStyles} align="center">
          <PrimaryButton
            onClick={handleDownload}
            styles={buttonStyles}
            // download={true}
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
            justifyContent: "center",
            height: "100%",
            alignItems: "center",
            paddingTop: "5vh",
            gap: "12px",
            padding: "5vh 24px 24px ",
          }}
          ref={printRef}
        >
          {name && (
            <>
              <h3>
                <b>{name}</b>
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                {category && (
                  <span style={{ textAlign: "center" }}>
                    <b>Category:</b> <br />
                    {category[0].name}
                  </span>
                )}
                {parentAsset && (
                  <span style={{ textAlign: "center" }}>
                    <b>Parent Asset:</b> <br />
                    {parentAsset[0].name}
                  </span>
                )}
                {product && (
                  <span style={{ textAlign: "center" }}>
                    <b>Product:</b>
                    <br /> {product[0].name}
                  </span>
                )}
              </div>
            </>
          )}

          <QRCanvas
            // ref={(elm: QRCanvas) => {
            //   canvasRef = elm;
            // }}
            options={options}
          />
        </div>
      </Panel>
    </div>
  );
};
