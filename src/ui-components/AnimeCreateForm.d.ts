/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type AnimeCreateFormInputValues = {
    title?: string;
    createdAt?: string;
    image?: string;
};
export declare type AnimeCreateFormValidationValues = {
    title?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AnimeCreateFormOverridesProps = {
    AnimeCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AnimeCreateFormProps = React.PropsWithChildren<{
    overrides?: AnimeCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AnimeCreateFormInputValues) => AnimeCreateFormInputValues;
    onSuccess?: (fields: AnimeCreateFormInputValues) => void;
    onError?: (fields: AnimeCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AnimeCreateFormInputValues) => AnimeCreateFormInputValues;
    onValidate?: AnimeCreateFormValidationValues;
} & React.CSSProperties>;
export default function AnimeCreateForm(props: AnimeCreateFormProps): React.ReactElement;
