export interface IQRCodeGenProps {
  // These are set based on the toggles shown above the examples (not needed in real code)
  buttonValue: string;
  buttonLink: string;
  infoLabels: {
    name: string | null;
    category: ComponentFramework.LookupValue[] | null;
    parentAsset: ComponentFramework.LookupValue[] | null;
    product: ComponentFramework.LookupValue[] | null;
  };
}
