import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const dist = resolve(fileURLToPath(new URL("../dist", import.meta.url)));

/** Flat ESM subpath type shims for package.json exports */
const entryTypes = {
  "button.d.ts": `export { Button } from "./components/Button/index.js";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./components/Button/index.js";
`,
  "link.d.ts": `export { Link } from "./components/Link/index.js";
export type { LinkProps, LinkVariant } from "./components/Link/index.js";
`,
  "breadcrumb.d.ts": `export { Breadcrumb } from "./components/Breadcrumb/index.js";
export type { BreadcrumbProps, BreadcrumbItemConfig, BreadcrumbBackProps, BreadcrumbListProps, BreadcrumbItemProps, BreadcrumbSeparatorProps } from "./components/Breadcrumb/index.js";
`,
  "input.d.ts": `export { Input } from "./components/Input/index.js";
export type { InputProps } from "./components/Input/index.js";
`,
  "card.d.ts": `export { Card } from "./components/Card/index.js";
export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardContentProps,
  CardFooterProps,
} from "./components/Card/index.js";
`,
  "widget.d.ts": `export { Widget, mountWidget } from "./components/Widget/index.js";
export type {
  WidgetProps,
  WidgetMode,
  WidgetMountOptions,
} from "./components/Widget/index.js";
`,
  "metric.d.ts": `export { Metric, formatMetricChange, formatMetricValue, resolveMetricTrend } from "./components/Metric/index.js";
export type {
  MetricProps,
  MetricVariant,
  MetricTrend,
  MetricFormat,
  MetricClassNames,
  MetricSymbolProps,
  MetricLabelProps,
  MetricValueProps,
  MetricChangeProps,
  MetricHintProps,
  MetricExtraProps,
} from "./components/Metric/index.js";
`,
  "separator.d.ts": `export { Separator } from "./components/Separator/index.js";
export type { SeparatorProps, SeparatorOrientation } from "./components/Separator/index.js";
`,
  "callout.d.ts": `export { Callout } from "./components/Callout/index.js";
export type { CalloutProps, CalloutVariant } from "./components/Callout/index.js";
`,
  "quote.d.ts": `export { Quote } from "./components/Quote/index.js";
export type { QuoteProps, QuoteVariant } from "./components/Quote/index.js";
`,
  "checkbox.d.ts": `export { Checkbox } from "./components/Checkbox/index.js";
export type { CheckboxProps } from "./components/Checkbox/index.js";
`,
  "radio.d.ts": `export { Radio, RadioGroup } from "./components/Radio/index.js";
export type { RadioProps, RadioGroupProps } from "./components/Radio/index.js";
`,
  "checkbox-card.d.ts": `export { CheckboxCard } from "./components/CheckboxCard/index.js";
export type { CheckboxCardProps } from "./components/CheckboxCard/index.js";
`,
  "radio-card.d.ts": `export { RadioCard, RadioCardGroup } from "./components/RadioCard/index.js";
export type { RadioCardProps, RadioCardGroupProps } from "./components/RadioCard/index.js";
`,
  "reset.d.ts": `export { Reset, useReset, useResetOptional } from "./components/Reset/index.js";
export type { ResetRootProps, ResetTriggerProps, ResetTargetProps, ResetContextValue } from "./components/Reset/index.js";
`,
  "visible.d.ts": `export { Visible, Hidden } from "./components/Visible/index.js";
export type { VisibleProps, HiddenProps } from "./components/Visible/index.js";
`,
  "list-item.d.ts": `export { List, ListItem } from "./components/ListItem/index.js";
export type { ListProps, ListItemProps } from "./components/ListItem/index.js";
`,
  "badge.d.ts": `export { Badge } from "./components/Badge/index.js";
export type { BadgeProps, BadgeVariant } from "./components/Badge/index.js";
`,
  "label.d.ts": `export { Label } from "./components/Label/index.js";
export type { LabelProps } from "./components/Label/index.js";
`,
  "switch.d.ts": `export { Switch } from "./components/Switch/index.js";
export type { SwitchProps } from "./components/Switch/index.js";
`,
  "tabs.d.ts": `export { Tabs } from "./components/Tabs/index.js";
export type { TabsProps, TabsListProps, TabsTriggerProps, TabsContentProps, TabsVariant } from "./components/Tabs/index.js";
`,
  "accordion.d.ts": `export { Accordion } from "./components/Accordion/index.js";
export type { AccordionProps, AccordionItemProps, AccordionTriggerProps, AccordionContentProps, AccordionType, AccordionVariant } from "./components/Accordion/index.js";
`,
  "dialog.d.ts": `export { Dialog } from "./components/Dialog/index.js";
export type {
  DialogProps,
  DialogTriggerProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogFooterProps,
  DialogCloseProps,
} from "./components/Dialog/index.js";
`,
  "virtual-list.d.ts": `export { VirtualList } from "./components/VirtualList/index.js";
export type { VirtualListProps } from "./components/VirtualList/index.js";
`,
  "form.d.ts": `export { Form, buildInitialValues, resolveFieldRules, validateField, validateForm } from "./components/Form/index.js";
export type { FormProps, FormConfig, FormFieldConfig, FormFieldType, FormFieldOption, FormValues, FormErrors, FormValidationRule, FormValidateOn } from "./components/Form/index.js";
`,
  "page.d.ts": `export { Page } from "./components/Page/index.js";
export type { PageProps, PageConfig, PageBlock, PageLayoutConfig, PageSidebarConfig, PageHeaderConfig, PageActionConfig, PageNavItem, PageActionEvent, PageClassNames } from "./components/Page/index.js";
`,
  "card-validation.d.ts": `export { CardValidation, detectCardBrand, digitsOnly, formatCardNumber, formatExpiry, luhnCheck, isExpiryValid, validateCardValues, normalizeCardValues, cvcLength, maxNumberLength } from "./components/CardValidation/index.js";
export type { CardValidationProps, CardValidationValues, CardValidationErrors, CardValidationLabels, CardValidationPlaceholders, CardValidationClassNames, CardBrand } from "./components/CardValidation/index.js";
`,
  "error-boundary.d.ts": `export { ErrorBoundary } from "./components/ErrorBoundary/index.js";
export type { ErrorBoundaryProps, ErrorBoundaryFallbackProps } from "./components/ErrorBoundary/index.js";
`,
  "monaco-editor.d.ts": `export { MonacoEditor } from "./components/MonacoEditor/index.js";
export type { MonacoEditorProps } from "./components/MonacoEditor/index.js";
`,
  "flow-chart.d.ts": `export { FlowChart } from "./components/FlowChart/index.js";
export type { FlowChartProps, FlowChartNode, FlowChartEdge } from "./components/FlowChart/index.js";
`,
  "table.d.ts": `export { Table } from "./components/Table/index.js";
export type { TableProps, TableCaptionProps, TableSectionProps, TableRowProps, TableHeadProps, TableCellProps, TableVariant, TableSize } from "./components/Table/index.js";
`,
  "data-grid.d.ts": `export { DataGrid, exportDataGridToCsv, exportDataGridToExcel, importDataGridFromExcel } from "./components/DataGrid/index.js";
export type { DataGridProps, DataGridEngine, DataGridColumn, DataGridSortState, DataGridSortDirection, DataGridNativeProps, DataGridAgGridProps, DataGridAgGridOptions, DataGridExportConfig, DataGridEditableConfig, DataGridPaginationConfig, DataGridVirtualizeConfig, DataGridCellErrors, DataGridColumnEditor, DataGridValidationRule } from "./components/DataGrid/index.js";
export { validateDataGridCell, validateDataGridRow, resolveColumnRules } from "./components/DataGrid/index.js";
`,
  "toast.d.ts": `export { ToastProvider, toast, useToast, useToastOptional } from "./components/Toast/index.js";
export type { ToastInput, ToastVariant, ToastPosition, ToastProviderProps, ToastAction } from "./components/Toast/index.js";
`,
  "auth.d.ts": `export { OAuthButton, LoginForm } from "./components/Auth/index.js";
export type { OAuthProvider, OAuthButtonProps, LoginFormProps, LoginCredentials } from "./components/Auth/index.js";
`,
  "calendar.d.ts": `export { Calendar, DEFAULT_TIME_SLOTS } from "./components/Calendar/index.js";
export type { CalendarProps, CalendarTimeSlot, CalendarSlotSelection, CalendarWeekStartsOn, CalendarContextValue } from "./components/Calendar/index.js";
`,
  "server-query.d.ts": `export { ServerQuery, useServerQuery } from "./components/ServerQuery/index.js";
export type { ServerQueryFn, ServerQueryProps, ServerQueryResult, ServerQueryStatus, UseServerQueryOptions } from "./components/ServerQuery/index.js";
`,
  "skeleton.d.ts": `export { Skeleton } from "./components/Skeleton/index.js";
export type { SkeletonProps, SkeletonVariant } from "./components/Skeleton/index.js";
`,
  "scroll-area.d.ts": `export { ScrollArea, ScrollAreaSentinel, useScrollIntersection, useScrollAreaContext, useScrollAreaContextOptional } from "./components/ScrollArea/index.js";
export type { ScrollAreaProps, ScrollAreaType, ScrollAreaOrientation, ScrollMetrics, ScrollAreaSentinelProps, ScrollIntersectionOptions, ScrollAreaContextValue } from "./components/ScrollArea/index.js";
`,
  "code-block.d.ts": `export { CodeBlock } from "./components/CodeBlock/index.js";
export type { CodeBlockProps, CodeLanguage, CodeToken, CodeTokenType } from "./components/CodeBlock/index.js";
`,
  "markdown.d.ts": `export { Markdown, parseMarkdown } from "./components/Markdown/index.js";
export type { MarkdownProps, MarkdownComponents, BlockNode, InlineNode } from "./components/Markdown/index.js";
`,
  "side-nav.d.ts": `export { SideNav, useSideNavContext, useSideNavContextOptional, useSideNavMenusContext, useSideNavMenusContextOptional } from "./components/SideNav/index.js";
export type { SideNavProps, SideNavHeaderProps, SideNavMenusProps, SideNavMenuProps, SideNavGroupProps, SideNavSubmenuProps, SideNavListProps, SideNavVirtualListProps, SideNavLinkProps, SideNavItemProps, SideNavToggleProps, SideNavSide, SideNavCollapseMode, SideNavToggleVariant } from "./components/SideNav/index.js";
`,
  "page-layout.d.ts": `export { PageLayout } from "./components/PageLayout/index.js";
export type { PageLayoutProps, PageLayoutSidebarProps, PageLayoutMainProps, PageLayoutContentProps, PageLayoutAsideProps, PageLayoutVariant } from "./components/PageLayout/index.js";
`,
  "hero.d.ts": `export { Hero } from "./components/Hero/index.js";
export type { HeroProps, HeroCopyProps, HeroEyebrowProps, HeroTitleProps, HeroDescriptionProps, HeroActionsProps, HeroMediaProps, HeroBackgroundProps, HeroVariant, HeroBackground, HeroTextSide, HeroAlign, HeroSize, HeroClassNames } from "./components/Hero/index.js";
`,
  "slider.d.ts": `export { Slider } from "./components/Slider/index.js";
export type { SliderProps, SliderTrackProps, SliderSlideProps, SliderControlsProps, SliderPrevProps, SliderNextProps, SliderDotsProps, SliderClassNames } from "./components/Slider/index.js";
`,
  "loader.d.ts": `export { Loader } from "./components/Loader/index.js";
export type { LoaderProps, LoaderVariant, LoaderSize } from "./components/Loader/index.js";
`,
  "timeline.d.ts": `export { Timeline } from "./components/Timeline/index.js";
export type { TimelineProps, TimelineItemProps, TimelineItemStatus } from "./components/Timeline/index.js";
`,
  "grid.d.ts": `export { Grid } from "./components/Grid/index.js";
export type { GridProps, GridVariant, GridGap } from "./components/Grid/index.js";
`,
  "aspect-ratio.d.ts": `export { AspectRatio } from "./components/AspectRatio/index.js";
export type { AspectRatioProps } from "./components/AspectRatio/index.js";
`,
  "image.d.ts": `export { Image, buildSrcSet, buildResponsiveSrc, buildDefaultSrc } from "./components/Image/index.js";
export type { ImageProps } from "./components/Image/index.js";
export type { ImageSrcPattern } from "./components/Image/buildSrcSet.js";
`,
  "icon.d.ts": `export { Icon } from "./components/Icon/index.js";
export type { IconProps, IconSize } from "./components/Icon/index.js";
export type { IconName } from "./components/Icon/icons.js";
`,
  "typography.d.ts": `export { Typography } from "./components/Typography/index.js";
export type { TypographyProps, TypographyVariant, TypographyAlign } from "./components/Typography/index.js";
`,
  "color-palette.d.ts": `export { ColorPalette, DEFAULT_PALETTE } from "./components/ColorPalette/index.js";
export type { ColorPaletteProps, ColorSwatchProps, ColorSwatch } from "./components/ColorPalette/index.js";
`,
  "ai-chat.d.ts": `export { AiChat } from "./components/AiChat/index.js";
export type { AiChatProps, AiChatMessagesProps, AiChatMessageProps, AiChatPromptProps, AiChatSuggestionsProps, AiMessageRole } from "./components/AiChat/index.js";
`,
  "ai-workflow-builder.d.ts": `export { AiWorkflowBuilder, useAiWorkflowBuilder } from "./components/AiWorkflowBuilder/index.js";
export {
  AI_WORKFLOW_PALETTE,
  DEFAULT_AI_WORKFLOW_EDGES,
  DEFAULT_AI_WORKFLOW_NODES,
  createWorkflowNode,
} from "./components/AiWorkflowBuilder/index.js";
export type {
  AiWorkflowBuilderProps,
  AiWorkflowClassNames,
  AiWorkflowNodeData,
  AiWorkflowNodeKind,
  AiWorkflowEdge,
  AiWorkflowNode,
  AiWorkflowPaletteItem,
  UseAiWorkflowBuilderOptions,
  UseAiWorkflowBuilderResult,
} from "./components/AiWorkflowBuilder/index.js";
`,
  "ai-summarizer.d.ts": `export { AiSummarizer } from "./components/AiSummarizer/index.js";
export type { AiSummarizerProps, AiSummarizerFormat, AiSummarizerClassNames } from "./components/AiSummarizer/index.js";
`,
  "ai-data-analyst.d.ts": `export { AiDataAnalyst } from "./components/AiDataAnalyst/index.js";
export type { AiDataAnalystProps, AiDataAnalystResult, AiDataAnalystMetric, AiDataAnalystChartBar, AiDataAnalystTable, AiDataAnalystClassNames } from "./components/AiDataAnalyst/index.js";
`,
  "ai-form-filler.d.ts": `export { AiFormFiller } from "./components/AiFormFiller/index.js";
export type { AiFormFillerProps, AiFormFillerClassNames } from "./components/AiFormFiller/index.js";
`,
  "ai-search.d.ts": `export { AiSearch } from "./components/AiSearch/index.js";
export type { AiSearchProps, AiSearchItem, AiSearchResult, AiSearchClassNames } from "./components/AiSearch/index.js";
`,
  "ai-orchestrator.d.ts": `export { AiOrchestrator } from "./components/AiOrchestrator/index.js";
export type { AiOrchestratorProps, AiOrchestratorToolId, AiOrchestratorPipelineStep, AiOrchestratorClassNames } from "./components/AiOrchestrator/index.js";
`,
  "context-menu.d.ts": `export { ContextMenu } from "./components/ContextMenu/index.js";
export type { ContextMenuProps, ContextMenuTriggerProps, ContextMenuContentProps, ContextMenuItemProps, ContextMenuSeparatorProps, ContextMenuClassNames } from "./components/ContextMenu/index.js";
`,
  "feature-request.d.ts": `export { FeatureRequest, toFeatureRequestValues } from "./components/FeatureRequest/index.js";
export type { FeatureRequestProps, FeatureRequestValues, FeatureRequestClassNames } from "./components/FeatureRequest/index.js";
`,
  "questionnaire.d.ts": `export { Questionnaire, DEFAULT_QUESTIONNAIRE } from "./components/Questionnaire/index.js";
export type { QuestionnaireProps, QuestionnaireQuestion, QuestionnaireQuestionType, QuestionnaireAnswer, QuestionnaireAnswers, QuestionnaireClassNames } from "./components/Questionnaire/index.js";
`,
  "config.d.ts": `export { AsriUIProvider, useAsriUIConfig, useAsriUIConfigOptional, useAsriUIDebug, pushAnalyticsEvent, trackButtonClick, trackLinkClick, trackComponentEvent, initGtm, reportError, captureDebugError, clearDebugLogs, getDebugLogs } from "./config/index.js";
export type { AsriUIConfig, AsriUIConfigContextValue, AnalyticsConfig, MonitoringConfig, DebugConfig, DebugLogEntry, DebugLogSource, ThemeMode, AsriUIProviderProps, ErrorReportPayload, AnalyticsTrackProps } from "./config/index.js";
`,
  "utils.d.ts": `export { cn } from "./utils/index.js";
`,
  "hooks.d.ts": `export { useAsriUIId, useThemeAttribute } from "./hooks/index.js";
`,
  "motion.d.ts": `export * from "./motion/index.js";
`,
};

for (const [file, content] of Object.entries(entryTypes)) {
  await writeFile(resolve(dist, file), content, "utf8");
}

console.log("Generated flat subpath declaration files.");
