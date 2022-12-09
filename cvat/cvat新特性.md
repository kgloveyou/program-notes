# cvat新特性

## v2.0.0: Advanced authorization and organizations

[(https://github.com/opencv/cvat/releases/tag/v2.0.0)

### Summary

- Rotated bounding boxes (https://openvinotoolkit.github.io/cvat/v2.0.0/docs/manual/advanced/annotation-with-rectangles/#rotation-rectangle)

- Ellipses (https://openvinotoolkit.github.io/cvat/v2.0.0/docs/manual/advanced/annotation-with-ellipses/)

### Added

- Rotated bounding boxes ([#3832](https://github.com/opencv/cvat/pull/3832))
- Options to change font size & position of text labels on the canvas ([#3972](https://github.com/opencv/cvat/pull/3972))
- Support for working with ellipses ([#4062](https://github.com/opencv/cvat/pull/4062))
- Ability to continue working from the latest frame where an annotator was before ([#4297](https://github.com/opencv/cvat/pull/4297))
- 

## v2.0.0-alpha

[(https://github.com/openvinotoolkit/cvat/releases/tag/v2.0.0-alpha)

### Added

- Rotated bounding boxes ([#3832](https://github.com/openvinotoolkit/cvat/pull/3832))
- Player option: Smooth image when zoom-in, enabled by default ([#3933](https://github.com/openvinotoolkit/cvat/pull/3933))
- Options to change font size & position of text labels on the canvas ([#3972](https://github.com/openvinotoolkit/cvat/pull/3972))
- User is able to customize information that text labels show ([#4029](https://github.com/openvinotoolkit/cvat/pull/4029))
- 

## v1.7.0

[(https://github.com/opencv/cvat/releases/tag/v1.7.0)

## v1.6.0

[(https://github.com/opencv/cvat/releases/tag/v1.6.0)

## v1.5.0

[(https://github.com/opencv/cvat/releases/tag/v1.5.0)

### Summary

- Full support for 3D lidar annotation (import/export annotations and datasets in the release)

### Added

- Support of context images for 2D image tasks ([#3122](https://github.com/opencv/cvat/pull/3122))

## v1.4.0

[(https://github.com/opencv/cvat/releases/tag/v1.4.0)

### Added

- Documentation on mask annotation ([#3044](https://github.com/opencv/cvat/pull/3044))
- Hotkeys to switch a label of existing object or to change default label (for objects created with N) ([#3070](https://github.com/opencv/cvat/pull/3070))

## v1.3.0

[(https://github.com/opencv/cvat/releases/tag/v1.3.0)

### Added

- CVAT-3D: support lidar data on the server side ([#2534](https://github.com/opencv/cvat/pull/2534))
- CVAT-3D: Load all frames corresponding to the job instance
  ([#2645](https://github.com/opencv/cvat/pull/2645))
- CVAT-3D: Visualize 3D point cloud spaces in 3D View, Top View Side View and Front View ([#2768](https://github.com/opencv/cvat/pull/2768))

### Fixed

- Shortcuts with CAPSLOCK enabled and with non-US languages activated ([#2872](https://github.com/opencv/cvat/pull/2872))
- Updating label attributes when label contains number attributes ([#2969](https://github.com/opencv/cvat/pull/2969))
- Crop a polygon if its points are outside the bounds of the image ([#3025](https://github.com/opencv/cvat/pull/3025))

## v1.2.0

[(https://github.com/opencv/cvat/releases/tag/v1.2.0)

### Added

- Manual review pipeline: issues/comments/workspace ([#2357](https://github.com/opencv/cvat/pull/2357))
- Basic projects implementation ([#2255](https://github.com/opencv/cvat/pull/2255))

### Changed

- UI packages installation with `npm ci` instead of `npm install` ([#2350](https://github.com/opencv/cvat/pull/2350))
- 

# 标签类型

```json
type: "rectangle"
```

[Supported type for all labels (](https://github.com/opencv/cvat/commit/7265553654d5cbfc9640732df0a25ae153c9fb85)[#5273](https://github.com/opencv/cvat/pull/5273)[)](https://github.com/opencv/cvat/commit/7265553654d5cbfc9640732df0a25ae153c9fb85) …

