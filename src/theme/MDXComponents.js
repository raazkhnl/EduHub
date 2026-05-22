// Theme-wide MDX globals.
// Anything exported here is available in any .md/.mdx file *without* an import.

import MDXComponents from '@theme-original/MDXComponents';
import ResourceCard      from '@site/src/components/ResourceCard';
import SidebarItem, { SidebarItemList } from '@site/src/components/SidebarItem';
import ProgressTracker   from '@site/src/components/ProgressTracker';
import RequestPortal     from '@site/src/components/RequestPortal';
import AddToBundleButton from '@site/src/components/BundleBuilder/AddToBundleButton';
import ReadingTime       from '@site/src/components/ReadingTime';

export default {
  ...MDXComponents,
  ResourceCard,
  SidebarItem,
  SidebarItemList,
  ProgressTracker,
  RequestPortal,
  AddToBundleButton,
  ReadingTime,
};
