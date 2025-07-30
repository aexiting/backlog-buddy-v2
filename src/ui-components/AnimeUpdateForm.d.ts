/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Anime } from "../../API.ts";
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
export declare type AnimeUpdateFormInputValues = {
    title?: string;
    createdAt?: string;
    image?: string;
};
export declare type AnimeUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    image?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AnimeUpdateFormOverridesProps = {
    AnimeUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AnimeUpdateFormProps = React.PropsWithChildren<{
    overrides?: AnimeUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    anime?: Anime;
    onSubmit?: (fields: AnimeUpdateFormInputValues) => AnimeUpdateFormInputValues;
    onSuccess?: (fields: AnimeUpdateFormInputValues) => void;
    onError?: (fields: AnimeUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AnimeUpdateFormInputValues) => AnimeUpdateFormInputValues;
    onValidate?: AnimeUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AnimeUpdateForm(props: AnimeUpdateFormProps): React.ReactElement;
