# New banner & support images — intake folder

Drop newly generated (high-res) images here. We process them **one by one**:
you add a file, tell me, and I wire it into the right slot, then deploy.

## Naming convention

Use these exact filenames so I know where each one goes. Any common format is
fine (`.webp`, `.jpg`, `.png`) — I'll optimize/rename as needed.

### Homepage
| File you drop          | Goes to                                  | Generate at        |
| ---------------------- | ---------------------------------------- | ------------------ |
| `home-hero.*`          | Homepage full-bleed banner               | 1792×1024 (16:9)   |
| `home-support.*`       | Homepage "A life closer to nature" photo | 1024×1792 (portrait) |

### Product / category banners (full-bleed hero on each product page)
Generate all of these at **1792×1024 (16:9 landscape)**.

| File you drop                  | Category                          |
| ------------------------------ | --------------------------------- |
| `banner-bamboo-fencing.*`      | Bamboo fencing & edging           |
| `banner-bamboo-poles.*`        | Décor Moso bamboo poles           |
| `banner-tonkin-canes.*`        | Tonkin bamboo canes               |
| `banner-fence-panels.*`        | Bamboo fence panels               |
| `banner-reed-fencing.*`        | Reed fencing                      |
| `banner-willow-fencing.*`      | Other natural fencing (willow)    |
| `banner-thatch-roof.*`         | Natural thatch roof               |
| `banner-plywood.*`             | Bamboo plywood / wall cladding    |
| `banner-household.*`           | Bamboo household articles         |
| `banner-flower-sticks.*`       | Bamboo flower sticks              |
| `banner-artificial-rolls.*`    | Artificial fence rolls            |
| `banner-green-wall.*`          | Artificial green-wall panels      |

## Image-gen recipe (carry into every prompt)
- "shot on full-frame, 35–50mm, **deep focus**, **no watermark**, no text, no people"
- mid-distance framing — the product as a backdrop in a **realistic, high-class** setting
- for banners: keep the **lower-left / left third calmer** for the headline overlay

## Status log
- [ ] home-hero
- [ ] home-support
- [ ] banner-bamboo-fencing  (prompt ready)
