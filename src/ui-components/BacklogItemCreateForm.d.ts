/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type BacklogItemCreateFormInputValues = {
    title?: string;
    type?: string;
    rating?: number;
    createdAt?: string;
    owner?: string;
    status?: string;
    image?: string;
};
export declare type BacklogItemCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    type?: ValidationFunction<string>;
    rating?: ValidationFunction<number>;
    createdAt?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BacklogItemCreateFormOverridesProps = {
    BacklogItemCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    type?: PrimitiveOverrideProps<SelectFieldProps>;
    rating?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BacklogItemCreateFormProps = React.PropsWithChildren<{
    overrides?: BacklogItemCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: BacklogItemCreateFormInputValues) => BacklogItemCreateFormInputValues;
    onSuccess?: (fields: BacklogItemCreateFormInputValues) => void;
    onError?: (fields: BacklogItemCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BacklogItemCreateFormInputValues) => BacklogItemCreateFormInputValues;
    onValidate?: BacklogItemCreateFormValidationValues;
} & React.CSSProperties>;
export default function BacklogItemCreateForm(props: BacklogItemCreateFormProps): React.ReactElement;
