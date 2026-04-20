# Image Upload Feature Documentation

## Overview
The GO Time neighborhood map app now includes image upload functionality, allowing users to attach photos to their activity offerings and requests. Images are stored using Vercel Blob storage and displayed in activity detail views.

## Features Implemented

### 1. Image Upload in PublishActivity Form
- **File Input**: Users can click a button to select an image from their device
- **File Validation**:
  - Accepts only image formats: PNG, JPG, GIF
  - Maximum file size: 5MB
  - Validates MIME type
- **Preview Display**: Selected images show a preview before publishing
- **Remove Option**: Users can remove a selected image and choose a different one
- **Loading State**: Shows "Subiendo imagen..." while uploading to Blob storage

### 2. Vercel Blob Integration
- **Location**: `src/lib/blob.ts`
- **Function**: `uploadImageToBlob(file: File): Promise<string>`
- **Returns**: Public URL of the uploaded image
- **Error Handling**: Catches and logs upload errors, displays user-friendly messages

### 3. Activity Type Updates
- **File**: `src/types/index.ts`
- **Change**: Added optional `imageUrl?: string` field to Activity interface
- **Backward Compatible**: Existing activities without images still work

### 4. Image Display in Activity Details
- **Location**: `src/components/activities/ActivityDetailSheet.tsx`
- **Display**:
  - Shows image at the top of the detail sheet
  - Image height: 16rem (256px)
  - Full width with object-fit: cover
  - Rounded corners with border and shadow
- **Conditional Rendering**: Only displays if activity has an imageUrl

## UI/UX Details

### Upload Button Styling
```
- Dashed border indicates upload area
- Hover state changes border to primary color
- Shows icon + text guidance
- Disabled state during upload
```

### Image Preview
```
- Displays selected image before publishing
- Shows delete button (X) in top-right corner
- Primary color border to indicate selection
- Maintains aspect ratio with object-fit: cover
```

### Detail View Image
```
- Appears at top of sheet, above title
- Rounded corners (lg) with border
- Shadow effect for depth
- Responsive sizing
```

## File Structure
```
src/
├── lib/
│   └── blob.ts                  # Image upload utility
├── types/
│   └── index.ts                 # Activity type definition
└── components/activities/
    ├── PublishActivity.tsx        # Form with upload input
    └── ActivityDetailSheet.tsx    # Display uploaded image
```

## Code Changes Summary

### PublishActivity.tsx
- Added `useRef` for file input reference
- Added `Image`, `X` icons from lucide-react
- Added state for image preview and upload status
- Added `handleImageSelect()` for file handling
- Added `handleRemoveImage()` to clear selection
- Added image input field to form
- Added preview display with remove button

### ActivityDetailSheet.tsx
- Added conditional image display
- Image renders at top of detail sheet
- Uses `activity.imageUrl` for src

### blob.ts (New)
- Single function: `uploadImageToBlob()`
- Handles file to Blob conversion
- Returns public URL for display

### types/index.ts
- Added `imageUrl?: string` to Activity interface

## Environment Variables Required
```
VITE_VERCEL_BLOB_READ_WRITE_TOKEN
```
This is automatically provided by Vercel when Blob integration is connected.

## Testing Checklist

- [ ] Select an image in PublishActivity form
- [ ] Verify image preview displays correctly
- [ ] Click X to remove image and select a new one
- [ ] Submit activity with image
- [ ] Open activity detail and verify image displays
- [ ] Test with different image formats (PNG, JPG, GIF)
- [ ] Test file size validation (>5MB should reject)
- [ ] Test activities without images (fallback behavior)
- [ ] Verify responsive display on mobile devices

## Performance Considerations

- Images are lazily loaded only when activity detail is opened
- Blob storage automatically optimizes image delivery
- Preview images use data URLs (base64) so no network request during selection
- Actual upload happens only when form is submitted

## Future Enhancements

- [ ] Image cropping/editing before upload
- [ ] Multiple images per activity
- [ ] Image gallery view in detail sheet
- [ ] Image compression before upload
- [ ] Drag-and-drop support for image selection
- [ ] Image optimization/resizing on the server
- [ ] Watermark or timestamp embedding
- [ ] Image moderation/filtering
