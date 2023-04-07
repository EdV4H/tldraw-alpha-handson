import { LABEL_FONT_SIZES, TEXT_PROPS } from "@tldraw/tldraw";
import {
  TLAlignType,
  TLFillType,
  TLFontType,
  TLShape,
  TLSizeType,
} from "@tldraw/tlschema";
import React from "react";
import { useEditableText } from "../../hooks";
import { TextHelpers } from "../../utils/TextHelpers";
import { WBThemeShape } from "../WBTheme";

export const stopEventPropagation = (e: any) => e.stopPropagation();

type CustomShape = TLShape & WBThemeShape;

export const TextLabel = React.memo(function TextLabel<
  T extends Extract<CustomShape, { props: { text: string } }>
>({
  id,
  type,
  text,
  size,
  labelColor,
  font,
  align,
  wrap,
}: {
  id: T["id"];
  type: T["type"];
  size: TLSizeType;
  font: TLFontType;
  fill?: TLFillType;
  align: TLAlignType;
  wrap?: boolean;
  text: string;
  labelColor: string;
}) {
  const {
    rInput,
    isEmpty,
    isEditing,
    isEditableFromHover,
    handleFocus,
    handleChange,
    handleKeyDown,
    handleBlur,
  } = useEditableText(id, type, text);

  const isInteractive = isEditing || isEditableFromHover;

  return (
    <div
      className="rs-text-label"
      data-font={font}
      data-align={align}
      data-hastext={!isEmpty}
      data-isediting={isEditing}
      data-textwrap={!!wrap}
    >
      <div
        className="rs-text-label__inner"
        style={{
          fontSize: LABEL_FONT_SIZES[size],
          lineHeight: LABEL_FONT_SIZES[size] * TEXT_PROPS.lineHeight + "px",
          minHeight: isEmpty
            ? LABEL_FONT_SIZES[size] * TEXT_PROPS.lineHeight + 32
            : 0,
          minWidth: isEmpty ? 33 : 0,
          color: labelColor,
        }}
      >
        <div className="rs-text rs-text-content" dir="ltr">
          {TextHelpers.normalizeTextForDom(text)}
        </div>
        {isInteractive ? (
          // Consider replacing with content-editable
          <textarea
            ref={rInput}
            className="rs-text rs-text-input"
            name="text"
            tabIndex={-1}
            autoComplete="false"
            autoCapitalize="false"
            autoCorrect="false"
            autoSave="false"
            autoFocus={isEditing}
            placeholder=""
            spellCheck="true"
            wrap="off"
            dir="auto"
            // eslint-disable-next-line react/no-unknown-property
            datatype="wysiwyg"
            defaultValue={text}
            onFocus={handleFocus}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            onContextMenu={stopEventPropagation}
          />
        ) : null}
      </div>
    </div>
  );
});
