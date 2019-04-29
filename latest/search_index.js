var documenterSearchIndex = {"docs": [

{
    "location": "usage.html#",
    "page": "Introduction",
    "title": "Introduction",
    "category": "page",
    "text": ""
},

{
    "location": "usage.html#Introduction-1",
    "page": "Introduction",
    "title": "Introduction",
    "category": "section",
    "text": "Access to GMT from Julia is accomplished via a main function (also called gmt), which offers full access to all of GMT’s ~140 modules as well as fundamental import, formatting, and export of GMT data objects. Internally, the GMT5 C API defines six high-level data structures (GMT6 will define only five) that handle input and output of data via GMT modules. These are data tables (representing one or more sets of points, lines, or polygons), grids (2-D equidistant data matrices), raster images (with 1–4 color bands), raw PostScript code, text tables (free-form text/data mixed records) and color palette tables (i.e., color maps). Correspondingly, we have defined five data structures that we use at the interface between GMT and Julia via the gmt function. The GMT.jl wrapper is responsible for translating between the GMT structures and native Julia structures, which are:Grids: Many tools consider equidistant grids a particular data type and numerous file formats exist for saving such data. Because GMT relies on GDAL we are able to read and write almost all such formats in addition to a native netCDF4 format that complies with both the COARDS and CF netCDF conventions. We have designed a native Julia grid structure Grid type that holds header information from the GMT grid as well as the data matrix representing the gridded values. These structures may be passed to GMT modules that expect grids and are returned from GMT modules that produce such grids. In addition, we supply a function to convert a matrix and some metadata into a grid structure.\nImages: The raster image shares many characteristics with the grid structure except the bytes representing each node reflect gray shade, color bands (1, 3, or 4 for indexed, RGB and RGBA, respectively), and possibly transparency values. We therefore represent images in another native structure Image type that among other items contains three components: The image matrix, a color map (present for indexed images only), and an alpha matrix (for images specifying transparency on a per-pixel level). As for grids, a wrapper function creating the correct structure is available.\nSegments: GMT considers point, line, and polygon data to be organized in one or more segments in a data table. Modules that return segments uses a native Julia segment structure Dataset type that holds the segment data, which may be either numerical, text, or both; it also holds a segment header string which GMT uses to pass metadata. Thus, GMT modules returning segments will typically produce arrays of segments and you may pass these to any other module expecting points, lines, or polygons or use them directly in Julia. Since a matrix is one fundamental data type you can also pass a matrix directly to GMT modules as well. Consequently, it is very easy to pass data from Julia into GMT modules that process data tables as well as to receive data segments from GMT modules that process and produce data tables as output.\nColor palettes: GMT uses its flexible Color Palette Table (CPT) format to describe how the color (or pattern) of symbols, lines, polygons or grids should vary as a function of a state variable. In Julia, this information is provided in another structure CPT type that holds the color map as well as an optional alpha array for transparency values. Like grids, these structures may be passed to GMT modules that expect CPTs and will be returned from GMT modules that normally would produce CPT files.\nPostScript: While most users of the GMT.jl wrapper are unlikely to manipulate PostScript directly, it allows for the passing of PostScript via another data structure Postscript type.Given this design the Julia wrapper is designed to work in two distinct ways. The first way, referred as the monolithic, is the more feature reach and follows closely the GMT usage from shell(s) command line but still provide all the facilities of the Julia language. See the Monolithic for the Reference on how to use the Package.\nThe second way uses an upper level set of functions that abstract aspects that make the monolithic usage more complex. It provides an interface to some of the GMT modules using a option=val list type syntax. This makes it more appropriate for new commers but it won\'t release you from understanding the monolithic way. See the By Modules"
},

{
    "location": "examples.html#",
    "page": "Some examples",
    "title": "Some examples",
    "category": "page",
    "text": ""
},

{
    "location": "examples.html#Examples-1",
    "page": "Some examples",
    "title": "Examples",
    "category": "section",
    "text": ""
},

{
    "location": "examples.html#Here\'s-the-\"Hello-World\"-1",
    "page": "Some examples",
    "title": "Here\'s the \"Hello World\"",
    "category": "section",
    "text": "using GMT\nplot(1:10, rand(10), lw=1, lc=:blue, fmt=:png, marker=:square,\n     markeredgecolor=0, size=0.2, markerfacecolor=:red, title=\"Hello World\",\n     xlabel=\"Spoons\", ylabel=\"Forks\", show=true)<img src=\"figures/hello-world.png\" alt=\"Hello world\" width=\"500\" class=\"center\"/>A few notes about this example. Because we didn\'t specify the figure size (with the figsize keyword) a default value of 12x8 cm (not counting labels and title) was used. The fmt=png selected the PNG format. The show=true is needed to show the image at the end.But now we want an image made up with two layers of data. And we are going to plot on the sphere (the Earth). For that we will need to use the coast program to plot the Earth and append some curvy lines."
},

{
    "location": "examples.html#And-the-\"Hello-Round-World\"-1",
    "page": "Some examples",
    "title": "And the \"Hello Round World\"",
    "category": "section",
    "text": "x = range(0, stop=2pi, length=180);       seno = sin.(x/0.2)*45;\ncoast(region=[0 360 -90 90], proj=(name=:laea, center=(300,30)), frame=:g,\n      res=:crude, land=:navy, figsize=6)\n\nplot!(collect(x)*60, seno, lw=0.5, lc=:red, fmt=:png, marker=:circle,\n      markeredgecolor=0, size=0.05, markerfacecolor=:cyan, show=true)In this example region=[0 360 -90 90]  means the domain is the whole Earth, frame=:g sets the grid on, resolution=:c selects the crude coast lines resolution and the  land=:navy paints the continents with a navy blue color. The map projection used here is a Lambert projection (laea stands for Lambert Azimuthal Equal Area) with projection center at 300 degrees East, 30 degrees North.<img src=\"figures/hello-round-world.png\" alt=\"Hello round world\" width=\"400\" class=\"center\"/>Note that now the first command, the coast, does not have the show keyword. It means we are here creating the first layer but we don\'t want to see it just yet. The second command uses the ! variation of the plot function, which means that we are appending to a previous plot, and uses the show=true because we are done with this figure."
},

{
    "location": "examples.html#Simple-contours-1",
    "page": "Some examples",
    "title": "Simple contours",
    "category": "section",
    "text": "Contours are created with grdcontour that takes a grid as input (or a GMTgrid data type). This example shows uses the peaks function to create a classical example. Note, however, that the memory consumption in this example, when creating the plot, is much lower than traditional likewise  examples because we will be using only one 2D array instead of 3 3D arrays (ref). In the example cont=1 and annot=2 means draw contours at every 1 unit of the G grid and annotate at every other contour line. axis=\"a\" means pick a default automatic annotation and labeling for the axis.G = GMT.peaks();\ngrdcontour(G, cont=1, annot=2, fmt=:png, show=true)<img src=\"figures/hello-bw-contour.png\" alt=\"Simple black&white contour\" width=\"500\" class=\"center\"/>Now with colored contours. To make it colored we need to generate a color map and use it. Notice that we must specify a pen attribute to get the colored contours because pen specifications are always set separately. Here we will create first a colormap with makecpt that will from -6 to 8 with steps of 1. These values are picked up after the z values of the G grid. cpt = makecpt(range=(-6,8,1));      # Create the color map\ngrdcontour(G, fmt=:png, pen=(colored=true,), show=true)<img src=\"figures/hello-color-contour.png\" alt=\"Simple color contour\" width=\"500\" class=\"center\"/>"
},

{
    "location": "examples.html#Color-images-1",
    "page": "Some examples",
    "title": "Color images",
    "category": "section",
    "text": "Color images are made with grdimage which takes the usual common options and a color map. It operates over grids or images. The next example shows how to create a color appropriate for the grid\'s z range, plot the image and add a color scale. We use here the data keyword to tell the program to load the grid from a file. The  before the tut_relief.nc file name instructs GMT to download the file from its server on the first usage and save it in a cache dir. See the GMT tuturial for more details about what the arguments mean.topo = makecpt(color=:rainbow, range=(1000,5000,500), continuous=true);\ngrdimage(\"@tut_relief.nc\", shade=(azimuth=100, norm=\"e0.8\"), proj=:Mercator, frame=:a, color=topo)\ncolorbar!(pos=(anchor=:TC,length=(12.5,0.6), horizontal=true, offset=(0,1.0)),\n          color=topo, frame=(ylabel=:m,), fmt=:jpg, show=true)<img src=\"figures/hello-shaded-world.jpg\" alt=\"Hello shaded world\" width=\"500\" class=\"center\"/>"
},

{
    "location": "examples.html#Perspective-view-1",
    "page": "Some examples",
    "title": "Perspective view",
    "category": "section",
    "text": "We will make a perspective, color-coded view of the US Rockies from the southeast.topo = makecpt(color=:rainbow, range=(1000,5000,500), continuous=true);\ngrdview(\"@tut_relief.nc\", proj=:Mercator, zsize=1, shade=(azim=100, norm=\"e0.8\"), view=(135,30),\n        frame=:a, fmt=:jpg, Q=\"i100\", show=true)<img src=\"figures/hello-view-world.jpg\" alt=\"Hello 3D view world\" width=\"600\" class=\"center\"/>Above we used the Peaks function to create a contour plot. Let us use that grid again and display it this time as 3D bar plot in a perspective view. cmap = grd2cpt(G);      # Compute a colormap with the grid\'s data range\nbar3(G, lw=:thinnest, color=cmap, fmt=:png, show=true)<img src=\"figures/bar3-peaks.png\" alt=\"Hello bar3D\" width=\"500\" class=\"center\"/>"
},

{
    "location": "examples.html#Warp-image-in-geographical-projection-1",
    "page": "Some examples",
    "title": "Warp image in geographical projection",
    "category": "section",
    "text": "In this example we will load a network image (GDAL will do that for us) and make a creative world map. First command, the imshow, needs to set show=false to no display the image before it is complete. We have to do this because imshow is a one command only shot and so, by default, it has the show keyword hardwire to true.imshow(\"http://larryfire.files.wordpress.com/2009/07/untooned_jessicarabbit.jpg\",\n      frame=:g, region=:d, proj=:Sinusoidal, image_in=:r, show=false)\ncoast!(shore=(1,:white), resolution=:c, figsize=15, fmt=:png, show=true)<img src=\"http://w3.ualg.pt/~jluis/jessy.png\" alt=\"SinuJessica\" width=\"600\" class=\"center\"/>"
},

{
    "location": "rectangles.html#",
    "page": "Draw rectangles examples",
    "title": "Draw rectangles examples",
    "category": "page",
    "text": ""
},

{
    "location": "rectangles.html#Draw-rectangles-1",
    "page": "Draw rectangles examples",
    "title": "Draw rectangles",
    "category": "section",
    "text": ""
},

{
    "location": "rectangles.html#Simple-filled-rectangle-1",
    "page": "Draw rectangles examples",
    "title": "Simple filled rectangle",
    "category": "section",
    "text": "using GMT\nrect = [2 2; 2 6; 6 6; 6 2; 2 2];\nplot(rect, region=[0 10 0 10], lw=1, fill=:blue, axis=:a, axis=:equal, fmt=:png, show=true)(Image: \"Blue rectangle\")"
},

{
    "location": "rectangles.html#Rectangles-with-patterns-1",
    "page": "Draw rectangles examples",
    "title": "Rectangles with patterns",
    "category": "section",
    "text": "Now add some patterns. The full pattern syntax is explained in GMT patterns but basically we are using pattern number 20 at 200 dpi and a blue background for the left rectangle and pattern 89 also at 200 dpis for the right rectangle.using GMT\nrect = [1 1; 1 7; 4 7; 4 1; 1 1];\nplot(rect, region=[0 10 0 10], lw=1, fill=\"p20+bgreen+r200\", axis=:a, axis=:equal)\nplot!([4 0].+rect, lw=1, fill=\"p89+r200\", fmt=:png, show=true)(Image: \"Pattern Rectangles\")"
},

{
    "location": "rectangles.html#Rectangles-with-transparency-1",
    "page": "Draw rectangles examples",
    "title": "Rectangles with transparency",
    "category": "section",
    "text": "This variation creates rectangles with 0, 30% and 70% transparency as well as different boundary lines.using GMT\nrect = [0.5 0.5; 0.5 7; 2.5 7; 2.5 0.5; 0.5 0.5];\nplot(rect, region=[0 10 0 10], lw=0.5, fill=:blue, axis=:a, axis=:equal\")\nplot!([3 0].+rect, lw=1, ls=\"--\", fill=:blue, transparency=30)\nplot!([6 0].+rect, lw=2, lc=:red, fill=:blue, transparency=70, fmt=:png, show=true)(Image: \"Transparent Rectangles\")"
},

{
    "location": "frames.html#",
    "page": "Draw frames examples",
    "title": "Draw frames examples",
    "category": "page",
    "text": ""
},

{
    "location": "frames.html#Draw-Frames-1",
    "page": "Draw frames examples",
    "title": "Draw Frames",
    "category": "section",
    "text": ""
},

{
    "location": "frames.html#Geographic-basemaps-1",
    "page": "Draw frames examples",
    "title": "Geographic basemaps",
    "category": "section",
    "text": "Geographic base maps may differ from regular plot axis in that some projections support a “fancy” form of axis and is selected by the MAP_FRAME_TYPE setting. The annotations will be formatted according to the FORMAT_GEO_MAP template and MAPDEGREESYMBOL setting. A simple example of part of a base map is shown in Figure Geographic map border.using GMT\n\nbasemap(limits=(-1,2,0,0.4), proj=:M10, axis=(axes=:S, annot=1, ticks=\"15m\",grid=\"5m\"))\nt = [-1.0 0 0 3.33\n    0.25 0 0 0.833\n    1.25 0 0 0.28];\narrows!(t, arrow=(length=\"5p\",start=true,stop=true,angle=60), lw=0.5, fill=:black, noclip=true)\n\nT = text_record([-0.5 0.05; 0.375 0.05; 1.29166666 0.05], [\"annotation\", \"frame\", \"grid\"]);\ntext!(T, text_attrib=\"+f9p+jCB\", fmt=:png, show=true)(Image: \"B_geo_1\")The machinery for primary and secondary annotations axes can be utilized for geographic base maps. This may be used to separate degree annotations from minutes- and seconds-annotations. For a more complicated base map example using several sets of intervals, including different intervals and pen attributes for grid lines and grid crosses.using GMT\nbasemap(region=\"-2/1/0/0.35\", proj=:M10, axis=\"pa15mf5mg5m wSe s1f30mg15m\", conf=(MAP_FRAME_TYPE=\"fancy+\",\n	MAP_GRID_PEN_PRIMARY=\"thinnest,black,.\", MAP_GRID_CROSS_SIZE_SECONDARY=0.25, MAP_FRAME_WIDTH=0.2,\n	MAP_TICK_LENGTH_PRIMARY=0.25, FORMAT_GEO_MAP=\"ddd:mm:ssF\", FONT_ANNOT_PRIMARY=\"+8\", FONT_ANNOT_SECONDARY=12))\n# Draw Arrows and text\nt = [-1.875 0 0 0.33333\n    -0.45833 0 0 0.11111\n    0.541666 0 0 0.11111]\nplot!(t, symbol=\"v0.08+b+e+jc\", lw=0.5, fill=:black, y_offset=-1, no_clip=true)\nT = text_record([-2.1 0.025; -1.875 0.05; -0.45833 0.05; 0.541666 0.05],\n                [\"10p RM P:\", \"6p CB annotation\", \"6p CB frame\", \"6p CB grid\"])\ntext!(T, text_attrib=\"+f+j\", no_clip=true)\nt = [-1.5 0 0 1.33333; -0.25 0 0 0.66666; 0.625 0 0 0.33333]\nplot!(t, symbol=\"v0.08+b+e+jc\", lw=0.5, fill=:black, y_offset=-0.6, no_clip=true)\n\nT = text_record([-2.1 0.025; -1.5  0.05; -0.25 0.05; 0.625 0.05],\n                [\"10p RM S:\", \"9p CB annotation\", \"9p CB frame\", \"9p CB grid\"])\ntext!(T, text_attrib=\"+f+j\", no_clip=true, fmt=:png, show=true)(Image: \"B_geo_2\")"
},

{
    "location": "frames.html#Cartesian-linear-axes-1",
    "page": "Draw frames examples",
    "title": "Cartesian linear axes",
    "category": "section",
    "text": "For non-geographic axes, the MAP_FRAME_TYPE setting is implicitly set to plain. Other than that, cartesian linear axes are very similar to geographic axes. The annotation format may be controlled with the FORMAT_FLOAT_OUT parameter. By default, it is set to “%g”, which is a C language format statement for floating point numbers, and with this setting the various axis routines will automatically determine how many decimal points should be used by inspecting the stride settings. If FORMAT_FLOAT_OUT is set to another format it will be used directly (.e.g, “%.2f” for a fixed, two decimals format). Note that for these axes you may use the unit setting to add a unit string to each annotation.using GMT\nbasemap(basemap(region=\"0/12/0/1\", proj=\"X12/1\", axis=(frame=\"a4f2g1\",\n        xlabel=\"Frequency\", suffix=\"%\"), axis2=(frame=\"S\",)))\nt = [0 0 0 4.0; 6.0 0 0 2.0; 9.0 0 0 1.0];\nplot!(t, symbol=\"v2p+b+e+a60\", lw=0.5, fill=:black, y_offset=0.25, no_clip=true)\nT = text_record([2 0.2; 7 0.2; 9.5 0.2], [\"annotation\", \"frame\", \"grid\"]);\ntext!(T, text_attrib=\"+f9p+jCB\", clearance=\"0.025/0.025\", fill=:white, fmt=:png, show=true)(Image: \"B_linear\")"
},

{
    "location": "frames.html#Cartesian-log10-axes-1",
    "page": "Draw frames examples",
    "title": "Cartesian log10 axes",
    "category": "section",
    "text": "Due to the logarithmic nature of annotation spacings, the stride parameter takes on specific meanings. The following concerns are specific to log axes (see Figure Logarithmic projection axis):stride must be 1, 2, 3, or a negative integer -n. Annotations/ticks will then occur at 1, 1-2-5, or 1,2,3,4,...,9, respectively, for each magnitude range. For -n the annotations will take place every n‘th magnitude.\nAppend l to stride. Then, log10 of the annotation is plotted at every integer log10 value (e.g., x = 100 will be annotated as “2”) [Default annotates x as is].\nAppend p to stride. Then, annotations appear as 10 raised to log10 of the value (e.g., 10-5).using GMT\ngmt(\"set MAP_GRID_PEN_PRIMARY thinnest,.\")\nbasemap(region=\"1/1000/0/1\", proj=\"X8l/0.7\", axis=\"1f2g3p+l\\\"Axis Label\\\" S\")\nbasemap!(axis=\"1f2g3l+l\\\"Axis Label\\\" S\", y_offset=2.2)\nbasemap!(axis=\"1f2g3+l\\\"Axis Label\\\" S\", y_offset=2.2, fmt=:png, show=true)(Image: \"B_log\")"
},

{
    "location": "frames.html#Cartesian-exponential-axes-1",
    "page": "Draw frames examples",
    "title": "Cartesian exponential axes",
    "category": "section",
    "text": "Normally, stride will be used to create equidistant (in the user’s unit) annotations or ticks, but because of the exponential nature of the axis, such annotations may converge on each other at one end of the axis. To avoid this problem, you can append p to stride, and the annotation interval is expected to be in transformed units, yet the annotation itself will be plotted as un-transformed units. E.g., if stride = 1 and power = 0.5 (i.e., sqrt), then equidistant annotations labeled 1, 4, 9, ... will appear.using GMT\ngmt(\"set MAP_GRID_PEN_PRIMARY thinnest,.\")\nbasemap(region=\"0/100/0/0.9\", proj=\"X3ip0.5/0.25i\", axis=\"a3f2g1p+l\\\"Axis Label\\\" S\")\nbasemap!(axis=\"20f10g5+l\\\"Axis Label\\\" S\",  y_offset=2.2, fmt=:png, show=true)(Image: \"B_pow\")"
},

{
    "location": "frames.html#Cartesian-time-axes-1",
    "page": "Draw frames examples",
    "title": "Cartesian time axes",
    "category": "section",
    "text": "What sets time axis apart from the other kinds of plot axes is the numerous ways in which we may want to tick and annotate the axis. Not only do we have both primary and secondary annotation items but we also have interval annotations versus tick-mark annotations, numerous time units, and several ways in which to modify the plot. We will demonstrate this flexibility with a series of examples. While all our examples will only show a single x-axis (south, selected via -BS), time-axis annotations are supported for all axes.Our first example shows a time period of almost two months in Spring 2000. We want to annotate the month intervals as well as the date at the start of each week. Note the leading hyphen in the FORMATDATEMAP removes leading zeros from calendar items (e.g., 03 becomes 3).using GMT\nbasemap(region=\"2000-4-1T/2000-5-25T/0/1\", proj=\"X12/0.5\", axis=\"pa7Rf1d sa1O S\",\n        conf=(FORMAT_DATE_MAP=\"-o\", FONT_ANNOT_PRIMARY=\"+9p\"), fmt=:png, show=true)(Image: \"B_time1\")The next example shows two different ways to annotate an axis portraying 2 days in July 1969:using GMT\ngmt(\"set FORMAT_DATE_MAP \\\"o dd\\\" FORMAT_CLOCK_MAP hh:mm FONT_ANNOT_PRIMARY +9p\")\nbasemap(region=\"1969-7-21T/1969-7-23T/0/1\", proj=\"X12/0.5\", axis=\"pa6Hf1h sa1K S\")\nbasemap!(axis=\"pa6Hf1h sa1D S\", y_offset=1.7, fmt=:png, show=true)The lower example chooses to annotate the weekdays (by specifying a1K) while the upper example choses dates (by specifying a1D). Note how the clock format only selects hours and minutes (no seconds) and the date format selects a month name, followed by one space and a two-digit day-of-month number.(Image: \"B_time2\")The lower example chooses to annotate the weekdays (by specifying a1K) while the upper example choses dates (by specifying a1D). Note how the clock format only selects hours and minutes (no seconds) and the date format selects a month name, followed by one space and a two-digit day-of-month number.The third example presents two years, annotating both the years and every 3rd month.using GMT\nbasemap(region=\"1997T/1999T/0/1\", proj=\"X12/0.25\", axis=\"pa3Of1o sa1Y S\", conf=(FORMAT_DATE_MAP=\"o\",\n    FORMAT_TIME_PRIMARY_MAP=\"Character\", FONT_ANNOT_PRIMARY=\"+9p\"), fmt=:png, show=true)Note that while the year annotation is centered on the 1-year interval, the month annotations must be centered on the corresponding month and not the 3-month interval. The FORMAT_DATE_MAP selects month name only and FORMAT_TIME_PRIMARYMAP selects the 1-character, upper case abbreviation of month names using the current language (selected by GMTLANGUAGE).(Image: \"B_time3\")The fourth example only shows a few hours of a day, using relative time by specifying t in the region option while the TIME_UNIT is d (for days). We select both primary and secondary annotations, ask for a 12-hour clock, and let time go from right to left:using GMT\ngmt(\"set FORMAT_CLOCK_MAP=-hham FONT_ANNOT_PRIMARY +9p TIME_UNIT d\")\nbasemap(region=\"0.2t/0.35t/0/1\", proj=\"X-12/0.25\", axis=\"pa15mf5m sa1H S\",\n    conf=(FORMAT_CLOCK_MAP=\"-hham\", FONT_ANNOT_PRIMARY=\"+9p\", TIME_UNIT=\"d\"), fmt=:png, show=true)(Image: \"B_time4\")The fifth example shows a few weeks of time (Figure Cartesian time axis, example 5). The lower axis shows ISO weeks with week numbers and abbreviated names of the weekdays. The upper uses Gregorian weeks (which start at the day chosen by TIME_WEEK_START); they do not have numbers.using GMT\ngmt(\"set FORMAT_DATE_MAP u FORMAT_TIME_PRIMARY_MAP Character FORMAT_TIME_SECONDARY_MAP full\n     FONT_ANNOT_PRIMARY +9p\")\nbasemap(region=\"1969-7-21T/1969-8-9T/0/1\", proj=\"X12/0.25\", axis=\"pa1K sa1U S\")\ngmt(\"set FORMAT\\_DATE\\_MAP o TIME\\_WEEK\\_START Sunday FORMAT\\_TIME\\_SECONDARY\\_MAP Chararacter\")\nbasemap!(axis=\"pa3Kf1k sa1r S\", y_offset=1.7, fmt=:png, show=true)(Image: \"B_time5\")Our sixth example shows the first five months of 1996, and we have annotated each month with an abbreviated, upper case name and 2-digit year. Only the primary axes information is specified.using GMT\nbasemap(region=\"1996T/1996-6T/0/1\", proj=\"X12/0.25\", axis=\"a1Of1d S\",\n    conf=(FORMAT_DATE_MAP=\"\\\"o yy\\\"\", FORMAT_TIME_PRIMARY_MAP=\"Abbreviated\"), fmt=:png, show=true)(Image: \"B_time6\")Our seventh and final example illustrates annotation of year-days. Unless we specify the formatting with a leading hyphen in FORMAT_DATE_MAP we get 3-digit integer days. Note that in order to have the two years annotated we need to allow for the annotation of small fractional intervals; normally such truncated interval must be at least half of a full interval.using GMT\ngmt(\"set FORMAT_DATE_MAP jjj TIME_INTERVAL_FRACTION 0.05 FONT_ANNOT_PRIMARY +9p\")\nbasemap(region=\"2000-12-15T/2001-1-15T/0/1\", proj=\"X12/0.25\", axis=\"pa5Df1d sa1Y S\",\n    conf=(FORMAT_DATE_MAP=\"jjj\", TIME_INTERVAL_FRACTION=0.05, FONT_ANNOT_PRIMARY=\"+9p\"), fmt=:png, show=true)(Image: \"B_time7\")"
},

{
    "location": "frames.html#Custom-axes-1",
    "page": "Draw frames examples",
    "title": "Custom axes",
    "category": "section",
    "text": "    basemap(region=\"416/542/0/6.2831852\", proj=\"X-12/5\",\n            axis=(frame=(:left_full, :bot_full), fill=:lightblue),\n            xaxis=(annot=25, ticks=5, grid=25, suffix=\" Ma\"),\n            yaxis=(custom=(pos=[0 1 2 2.71828 3 3.1415926 4 5 6 6.2831852],\n                            type_=[\"a\", \"a\", \"f\", \"ag e\", \"f\", \"ag @~p@~\", \"f\", \"f\", \"f\", \"ag 2@~p@~\"]),),)\n\n    basemap!(axis=(frame=(:left_full, :bot_full),),\n            xaxis2=(custom=(pos=[416.0; 443.7; 488.3; 542],\n                            type_=[\"ig Devonian\", \"ig Silurian\", \"ig Ordovician\", \"ig Cambrian\"]),),\n            par=(MAP_ANNOT_OFFSET_SECONDARY=\"10p\", MAP_GRID_PEN_SECONDARY=\"2p\"), fmt=:png, show=true)(Image: \"B_time7\")"
},

{
    "location": "proj_examples.html#",
    "page": "Map projections",
    "title": "Map projections",
    "category": "page",
    "text": ""
},

{
    "location": "proj_examples.html#GMT-Map-Projections-1",
    "page": "Map projections",
    "title": "GMT Map Projections",
    "category": "section",
    "text": "GMT implements more than 30 different projections. They all project the input coordinates longitude and latitude to positions on a map. In general, x’ = f(x,y,z) and y’ = g(x,y,z), where z is implicitly given as the radial vector length to the (x,y) point on the chosen ellipsoid. The functions f and g can be quite nasty and we will refrain from presenting details in this document. The interested read is referred to Snyder [1987] [20]. We will mostly be using the coast command to demonstrate each of the projections. GMT map projections are grouped into four categories depending on the nature of the projection. The groups areConic map projections\nAzimuthal map projections\nCylindrical map projections\nMiscellaneous projections"
},

{
    "location": "proj_examples.html#Conic-projections-1",
    "page": "Map projections",
    "title": "Conic projections",
    "category": "section",
    "text": ""
},

{
    "location": "proj_examples.html#Albers-conic-equal-area-projection-1",
    "page": "Map projections",
    "title": "Albers conic equal-area projection",
    "category": "section",
    "text": "This projection, developed by Albers in 1805, is predominantly used to map regions of large east-west extent, in particular the United States. It is a conic, equal-area projection, in which parallels are unequally spaced arcs of concentric circles, more closely spaced at the north and south edges of the map. Meridians, on the other hand, are equally spaced radii about a common center, and cut the parallels at right angles. Distortion in scale and shape vanishes along the two standard parallels. Between them, the scale along parallels is too small; beyond them it is too large. The opposite is true for the scale along meridians. To define the projection in GMT you need to provide the following information:Name: aea, Albers, GMT code -> B (width) b (scale)\nLongitude and latitude of the projection center.\nTwo standard parallels.\nMap scale in cm/degree or 1:xxxxx notation, or map width.Note that you must include the 1: if you choose to specify the scale that way. E.g., you can say 0.5 which means 0.5 cm/degree or 1:200000 which means 1 cm on the map equals 200,000 cm along the standard parallels. The projection center defines the origin of the rectangular map coordinates. As an example we will make a map of the region near Taiwan. We choose the center of the projection to be at 125ºE/20ºN and 25ºN and 45ºN as our two standard parallels. We desire a map that is 12 cm wide (the dafault). The complete command needed to generate the map below is therefore given by:coast(region=[110 140 20 35],                                   # The Map limits	\n      proj=(name=:Albers, center=[125 20], parallels=[25 45]),  # The projection parameters\n      frame=:ag,          # Tell it to set annotations and grid lines automatically\n      resolution=:low,    # Use the low resolution coastlines\n      area=250,           # Do not plot polygons with areas < 250 km^2\n      land=:green,        # Paint land with green\n      shore=:thinnest,    # Coastlines are drwan with a 0.1 pt thickness\n      show=true)<img src=\"figures/mapproj/GMT_albers.png\" alt=\"GMT_Albers\" title=\"Albers equal-area conic map projection\" width=\"500\" class=\"center\"/>"
},

{
    "location": "proj_examples.html#Equidistant-conic-1",
    "page": "Map projections",
    "title": "Equidistant conic",
    "category": "section",
    "text": "The equidistant conic projection was described by the Greek philosopher Claudius Ptolemy about A.D. 150. It is neither conformal or equal-area, but serves as a compromise between them. The scale is true along all meridians and the standard parallels. To select this projection in GMT you must provide the same information as for the other conic projection, i.e.,Name: eqdc, conicEquidistant, GMT code -> D (width) d (scale)\nLongitude and latitude of the projection center.\nTwo standard parallels.\nMap scale in cm/degree or 1:xxxxx notation, or map width.The equidistant conic projection is often used for atlases with maps of small countries. As an example, we generate a map of Cuba:coast(region=[-88 -70 18 24], proj=(name=:eqdc, center=[-79 21], parallels=[19 23]),\n      frame=:ag, res=:intermediate, borders=(type=1,pen=(\"thick\",\"red\")), land=:green,\n      shore=:thinnest, show=true)<img src=\"figures/mapproj/GMT_equidistant_conic.png\" alt=\"GMT_equidistant_conic\" title=\"Equidistant conic map projection\" width=\"500\" class=\"center\"/>"
},

{
    "location": "proj_examples.html#Lambert-conic-conformal-1",
    "page": "Map projections",
    "title": "Lambert conic conformal",
    "category": "section",
    "text": "This conic projection was designed by the Alsatian mathematician Johann Heinrich Lambert (1772) and has been used extensively for mapping of regions with predominantly east-west orientation, just like the Albers projection. Unlike the Albers projection, Lambert’s conformal projection is not equal-area. The parallels are arcs of circles with a common origin, and meridians are the equally spaced radii of these circles. As with Albers projection, it is only the two standard parallels that are distortion-free. To select this projection in GMT you must provide the same information as for the Albers projection, i.e.,Name: lcc, lambertConic, GMT code -> L (width) l (scale)\nLongitude and latitude of the projection center.\nTwo standard parallels.\nMap scale in cm/degree or 1:xxxxx notation, or map width.The Lambert conformal projection has been used for basemaps for all the 48 contiguous States with the two fixed standard parallels 33ºN and 45ºN. We will generate a map of the continental USA using these parameters. Note that with all the projections you have the option of selecting a rectangular border rather than one defined by meridians and parallels. Here, we choose the regular WESN region, a “fancy” basemap frame, and use degrees west for longitudes. The generating command used iscoast(region=[-130 -70 24 52], proj=(name=:lambertConic, center=[-100 35], parallels=[33 45]),\n      frame=:ag, res=:low, borders=((type=1, pen=(\"thick\",\"red\")), (type=2, pen=(\"thinner\",))),\n      area=500, land=:tan, water=:blue, shore=(:thinnest,:white), show=true)<img src=\"figures/mapproj/GMT_lambert_conic.png\" alt=\"GMT_lambert_conic\" title=\"Lambert conformal conic map projection\" width=\"500\" class=\"center\"/>"
},

{
    "location": "proj_examples.html#(American)-polyconic-projection-1",
    "page": "Map projections",
    "title": "(American) polyconic projection",
    "category": "section",
    "text": "The polyconic projection, in Europe usually referred to as the American polyconic projection, was introduced shortly before 1820 by the Swiss-American cartographer Ferdinand Rodulph Hassler (1770–1843). As head of the Survey of the Coast, he was looking for a projection that would give the least distortion for mapping the coast of the United States. The projection acquired its name from the construction of each parallel, which is achieved by projecting the parallel onto the cone while it is rolled around the globe, along the central meridian, tangent to that parallel. As a consequence, the projection involves many cones rather than a single one used in regular conic projections.The polyconic projection is neither equal-area, nor conformal. It is true to scale without distortion along the central meridian. Each parallel is true to scale as well, but the meridians are not as they get further away from the central meridian. As a consequence, no parallel is standard because conformity is lost with the lengthening of the meridians.Name: poly, Polyconic, GMT code -> Poly (width) poly (scale)Below we reproduce the illustration by Snyder [1987], with a gridline every 10 and annotations only every 30º in longitude:coast(region=(-180,-20,0,90), proj=:poly, xaxis=(annot=30,grid=10), yaxis=(annot=10,grid=10),\n      res=:crude, area=1000, land=:lightgray, shore=:thinnest, figsize=10, show=true)<img src=\"figures/mapproj/GMT_polyconic.png\" alt=\"GMT_Polyconic\" title=\"(American) polyconic projection\" width=\"500\" class=\"center\"/>"
},

{
    "location": "proj_examples.html#Azimuthal-projections-1",
    "page": "Map projections",
    "title": "Azimuthal projections",
    "category": "section",
    "text": ""
},

{
    "location": "proj_examples.html#Lambert-Azimuthal-Equal-Area-1",
    "page": "Map projections",
    "title": "Lambert Azimuthal Equal-Area",
    "category": "section",
    "text": "This projection was developed by Lambert in 1772 and is typically used for mapping large regions like continents and hemispheres. It is an azimuthal, equal-area projection, but is not perspective. Distortion is zero at the center of the projection, and increases radially away from this point. To define this projection in GMT you must provide the following information:Name: laea, lambertAzimuthal, GMT code -> A (width) a (scale)\nLongitude and latitude of the projection center.\nOptionally, the horizon, i.e., the number of degrees from the center to the edge (<= 180, default is 90).\nScale as 1:xxxxx or as radius/latitude where radius is the projected distance on the map from projection center to an oblique latitude where 0 would be the oblique Equator, or map width.Two different types of maps can be made with this projection depending on how the region is specified. We will give examples of both types."
},

{
    "location": "proj_examples.html#Rectangular-map-1",
    "page": "Map projections",
    "title": "Rectangular map",
    "category": "section",
    "text": "In this mode we define our region by specifying the longitude/latitude of the lower left and upper right corners instead of the usual west, east, south, north boundaries. The reason for specifying our area this way is that for this and many other projections, lines of equal longitude and latitude are not straight lines and are thus poor choices for map boundaries. Instead we require that the map boundaries be rectangular by defining the corners of a rectangular map boundary. Using 0ºE/40ºS (lower left) and 60ºE/10ºS (upper right) as our corners we try.. Este so funciona uma vez por causa do -Gp. Depois e preciso fazer \"destroy\"coast(region=\"0/-40/60/-10+r\", proj=(name=:laea, center=[30,-30]), frame=:ag, res=:low,\n      area=500, land=(pattern=10,dpi=300), shore=:thinnest, figsize=10, show=1)<img src=\"figures/mapproj/lambert_az_rect.png\" alt=\"Lambert_az_rect\" width=\"500\" class=\"center\"/>Note that an +r is appended to the region option to inform GMT that the region has been selected using the rectangle technique, otherwise it would try to decode the values as west, east, south, north and report an error since east < west."
},

{
    "location": "proj_examples.html#Hemisphere-map-1",
    "page": "Map projections",
    "title": "Hemisphere map",
    "category": "section",
    "text": "Here, you must specify the world as your region. E.g., to obtain a hemisphere view that shows the Americas, trycoast(region=:g, proj=(name=:laea, center=[280,30]), frame=:g, res=:crude, area=1000,\n      land=:navy, figsize=8, show=true)<img src=\"figures/mapproj/GMT_lambert_az_hemi.png\" alt=\"GMT_Lambert_az_hemi\" width=\"400\" class=\"center\"/>"
},

{
    "location": "proj_examples.html#Stereographic-Equal-Angle-1",
    "page": "Map projections",
    "title": "Stereographic Equal-Angle",
    "category": "section",
    "text": "This is a conformal, azimuthal projection that dates back to the Greeks. Its main use is for mapping the polar regions. In the polar aspect all meridians are straight lines and parallels are arcs of circles. While this is the most common use it is possible to select any point as the center of projection. The requirements areName: stere, Stereographic, GMT code -> S (width) s (scale)\nLongitude and latitude of the projection center.\nOptionally, the horizon, i.e., the number of degrees from the center to the edge (< 180, default is 90).\nScale as 1:xxxxx (true scale at pole), slat/1:xxxxx (true scale at standard parallel slat), or radius/latitude where radius is distance on map in inches from projection center to a particular oblique latitude, or simply map width.A default map scale factor of 0.9996 will be applied by default. However, the setting is ignored when a standard parallel has been specified since the scale is then implicitly given. We will look at two different types of maps."
},

{
    "location": "proj_examples.html#Polar-Stereographic-Map-1",
    "page": "Map projections",
    "title": "Polar Stereographic Map",
    "category": "section",
    "text": "In our first example we will let the projection center be at the north pole. This means we have a polar stereographic projection and the map boundaries will coincide with lines of constant longitude and latitude. An example is given bycoast(region=(-30,30,60,72), proj=(name=:Stereographic, center=[0,90], paralles=60),\n      frame=:a10g, res=:low, area=250, land=:royalblue, water=:seashell,\n      figscale=\"1:30000000\", show=1)<img src=\"figures/mapproj/GMT_stereographic_polar.png\" alt=\"GMT_stereographic_polar\" width=\"500\" class=\"center\"/>"
},

{
    "location": "proj_examples.html#Rectangular-stereographic-map-1",
    "page": "Map projections",
    "title": "Rectangular stereographic map",
    "category": "section",
    "text": "As with Lambert’s azimuthal equal-area projection we have the option to use rectangular boundaries rather than the wedge-shape typically associated with polar projections. This choice is defined by selecting two points as corners in the rectangle and appending an +r to the region option. This command produces a map as presented incoast(region=\"-25/59/70/72+r\", proj=(name=:stereographic, center=(10,90)), frame=:a20g, res=:low,\n      area=250, land=:darkbrown, shore=:thinnest, water=:lightgray, figsize=11, show=true)<img src=\"figures/mapproj/GMT_stereographic_rect.png\" alt=\"GMT_stereographic_rect\" width=\"500\" class=\"center\"/>"
},

{
    "location": "proj_examples.html#General-stereographic-map-1",
    "page": "Map projections",
    "title": "General stereographic map",
    "category": "section",
    "text": "In terms of usage this projection is identical to the Lambert azimuthal equal-area projection. Thus, one can make both rectangular and hemispheric maps. Our example shows Australia using a projection pole at 130ºE/30ºS. The command used wascoast(region=\"100/-42/160/-8r\", proj=(name=:stereographic, center=(130,-30)), frame=:ag, res=:low,\n      area=500, land=:green, ocean=:lightblue, shore=:thinnest, figsize=10, show=true)<img src=\"figures/mapproj/GMT_stereographic_general.png\" alt=\"GMT_stereographic_general\" width=\"500\" class=\"center\"/>"
},

{
    "location": "proj_examples.html#Perspective-1",
    "page": "Map projections",
    "title": "Perspective",
    "category": "section",
    "text": "The perspective projection imitates in 2 dimensions the 3-dimensional view of the earth from space. The implementation in GMT is very flexible, and thus requires many input variables. Those are listed and explained below, with the values used in figure below  between brackets.Name: GMT code -> G (width) g (scale)\nLongitude and latitude of the projection center (4ºE/52ºN).\nAltitude of the viewer above sea level in kilometers (230 km). If this value is less than 10, it is assumed to be the distance of the viewer from the center of the earth in earth radii. If an +r is appended, it is the distance from the center of the earth in kilometers.\nAzimuth in degrees (90, due east). This is the direction in which you are looking, measured clockwise from north.\nTilt in degrees (60). This is the viewing angle relative to zenith. So a tilt of 0º is looking straight down, 60º is looking from 30º above the horizon.\nTwist in degrees (180). This is the boresight rotation (clockwise) of the image. The twist of 180º in the example mimics the fact that the Space Shuttle flies upside down.\nWidth and height of the viewpoint in degrees (60). This number depends on whether you are looking with the naked eye (in which case you view is about 60º wide), or with binoculars, for example.\nScale as 1:xxxxx or as radius/latitude where radius is distance on map in inches from projection center to a particular oblique latitude, or map width (10 cm).The imagined view of northwest Europe from a Space Shuttle at 230 km looking due east is thus accomplished by the following coast command:coast(region=:g, proj=\"G4/52/230/90/60/180/60/60\", xaxis=(annot=2,grid=2), yaxis=(annot=1,grid=1),\n      rivers=:all, res=:intermediate, land=:lightbrown, ocean=:lightblue, shore=:thinnest, figsize=10,\n      par=(:MAP_ANNOT_MIN_SPACING,0.65), show=true)<img src=\"figures/mapproj/GMT_perspective.png\" alt=\"GMT_perspective\" width=\"500\" class=\"center\"/>"
},

{
    "location": "proj_examples.html#Orthographic-1",
    "page": "Map projections",
    "title": "Orthographic",
    "category": "section",
    "text": "The orthographic azimuthal projection is a perspective projection from infinite distance. It is therefore often used to give the appearance of a globe viewed from outer space. As with Lambert’s equal-area and the stereographic projection, only one hemisphere can be viewed at any time. The projection is neither equal-area nor conformal, and much distortion is introduced near the edge of the hemisphere. The directions from the center of projection are true. The projection was known to the Egyptians and Greeks more than 2,000 years ago. Because it is mainly used for pictorial views at a small scale, only the spherical form is necessary.To specify the orthographic projection the same options -Jg or -JG as the perspective projection are used, but with fewer variables to supply:Name: ortho, Ortographic, GMT code -> G (width) g (scale)\nLongitude and latitude of the projection center.\nOptionally, the horizon, i.e., the number of degrees from the center to the edge (<= 90, default is 90).\nScale as 1:xxxxx or as radius/latitude where radius is distance on map in inches from projection center to a particular oblique latitude, or map width.Our example of a perspective view centered on 75ºW/40ºN can therefore be generated by the following coast command:coast(region=:g, proj=(name=:ortho, center=(-75,41)), frame=:g, res=:crude, area=5000,\n      land=:pink, ocean=:thistle, figsize=10, show=true)<img src=\"figures/mapproj/GMT_orthographic.png\" alt=\"GMT_orthographic\" width=\"400\" class=\"center\"/>"
},

{
    "location": "proj_examples.html#Azimuthal-Equidistant-1",
    "page": "Map projections",
    "title": "Azimuthal Equidistant",
    "category": "section",
    "text": "The most noticeable feature of this azimuthal projection is the fact that distances measured from the center are true. Therefore, a circle about the projection center defines the locus of points that are equally far away from the plot origin. Furthermore, directions from the center are also true. The projection, in the polar aspect, is at least several centuries old. It is a useful projection for a global view of locations at various or identical distance from a given point (the map center).To specify the azimuthal equidistant projection you must supply:Name: aeqd, azimuthalEquidistant, GMT code -> E (width) e (scale)\nLongitude and latitude of the projection center.\nOptionally, the horizon, i.e., the number of degrees from the center to the edge (<= 180, default is 180).\nScale as 1:xxxxx or as radius/latitude where radius is distance on map in inches from projection center to a particular oblique latitude, or map width.Our example of a global view centered on 100ºW/40ºN can therefore be generated by the following coast command. Note that the antipodal point is 180º away from the center, but in this projection this point plots as the entire map perimeter:coast(region=:g, proj=(name=:azimuthalEquidistant, center=(-100,40)), frame=:g,\n      res=:crude, area=10000, land=:lightgray, shore=:thinnest, figsize=10, show=true)<img src=\"figures/mapproj/GMT_az_equidistant.png\" alt=\"GMT_az_equidistant\" width=\"400\" class=\"center\"/>"
},

{
    "location": "proj_examples.html#Gnomonic-1",
    "page": "Map projections",
    "title": "Gnomonic",
    "category": "section",
    "text": "The Gnomonic azimuthal projection is a perspective projection from the center onto a plane tangent to the surface. Its origin goes back to the old Greeks who used it for star maps almost 2500 years ago. The projection is neither equal-area nor conformal, and much distortion is introduced near the edge of the hemisphere; in fact, less than a hemisphere may be shown around a given center. The directions from the center of projection are true. Great circles project onto straight lines. Because it is mainly used for pictorial views at a small scale, only the spherical form is necessary.To specify the Gnomonic projection you must supply:Name: gnom, Gnomonic, GMT code -> F (width) f (scale)\nLongitude and latitude of the projection center.\nOptionally, the horizon, i.e., the number of degrees from the center to the edge (< 90, default is 60).\nScale as 1:xxxxx or as radius/latitude where radius is distance on map in cm from projection center to a particular oblique latitude, or map width.Using a horizon of 60, our example of this projection centered on 120ºW/35ºN can therefore be generated by the following command:coast(region=:g, proj=(name=:Gnomonic, center=(-120,35), horizon=60),\n      frame=(annot=30, grid=15), res=:crude, area=10000, land=:tan, ocean=:cyan,\n      shore=:thinnest, figsize=10, show=true)<img src=\"figures/mapproj/GMT_gnomonic.png\" alt=\"GMT_gnomonic\" width=\"400\" class=\"center\"/>"
},

{
    "location": "proj_examples.html#Cylindrical-projections-1",
    "page": "Map projections",
    "title": "Cylindrical projections",
    "category": "section",
    "text": "Cylindrical projections are easily recognized for its shape: maps are rectangular and meridians and parallels are straight lines crossing at right angles. But that is where similarities between the cylindrical projections supported by GMT (Mercator, transverse Mercator, universal transverse Mercator, oblique Mercator, Cassini, cylindrical equidistant, cylindrical equal-area, Miller, and cylindrical stereographic projections) stops. Each have a different way of spacing the meridians and parallels to obtain certain desirable cartographic properties."
},

{
    "location": "proj_examples.html#Mercator-1",
    "page": "Map projections",
    "title": "Mercator",
    "category": "section",
    "text": "Probably the most famous of the various map projections, the Mercator projection takes its name from the Flemish cartographer Gheert Cremer, better known as Gerardus Mercator, who presented it in 1569. The projection is a cylindrical and conformal, with no distortion along the equator. A major navigational feature of the projection is that a line of constant azimuth is straight. Such a line is called a rhumb line or loxodrome. Thus, to sail from one point to another one only had to connect the points with a straight line, determine the azimuth of the line, and keep this constant course for the entire voyage. The Mercator projection has been used extensively for world maps in which the distortion towards the polar regions grows rather large, thus incorrectly giving the impression that, for example, Greenland is larger than South America. In reality, the latter is about eight times the size of Greenland. Also, the Former Soviet Union looks much bigger than Africa or South America. One may wonder whether this illusion has had any influence on U.S. foreign policy.In the regular Mercator projection, the cylinder touches the globe along the equator. Other orientations like vertical and oblique give rise to the Transverse and Oblique Mercator projections, respectively. We will discuss these generalizations following the regular Mercator projection.The regular Mercator projection requires a minimum of parameters. To use it in GMT programs you supply this information (the first two items are optional and have defaults):Name: merc, Mercator, GMT code -> M (width) m (scale)\nCentral meridian [Middle of your map].\nStandard parallel for true scale [Equator]. When supplied, central meridian must be supplied as well.\nScale along the equator in cm/degree or 1:xxxxx, or map width.Our example presents a world map at a scale of 0.012 inch pr degree which will give a map 4.32 inch wide. It was created with the command:coast(region=(0,360,-70,70), proj=:Mercator, xaxis=(annot=60,ticks=15), yaxis=(annot=30,ticks=15),\n      res=:crude, area=:5000, land=:red, scale=0.03, par=(:MAP_FRAME_TYPE,\"fancy+\"), show=true)<img src=\"figures/mapproj/GMT_mercator.png\" alt=\"GMT_mercator\" width=\"500\" class=\"center\"/>While this example is centered on the Dateline, one can easily choose another configuration with the region option. A map centered on Greenwich would specify the region with region=(-180180-7070)"
},

{
    "location": "proj_examples.html#Transverse-Mercator-1",
    "page": "Map projections",
    "title": "Transverse Mercator",
    "category": "section",
    "text": "The transverse Mercator was invented by Lambert in 1772. In this projection the cylinder touches a meridian along which there is no distortion. The distortion increases away from the central meridian and goes to infinity at 90º from center. The central meridian, each meridian 90º away from the center, and equator are straight lines; other parallels and meridians are complex curves. The projection is defined by specifying:Name: tmerc, transverseMercator, GMT code -> T (width) t (scale)\nThe central meridian.\nOptionally, the latitude of origin (default is the equator).\nScale along the equator in cm/degree or 1:xxxxx, or map width.The optional latitude of origin defaults to Equator if not specified. Although defaulting to 1, you can change the map scale factor via the PROJ_SCALE_FACTOR parameter. Our example shows a transverse Mercator map of south-east Europe and the Middle East with 35ºE as the central meridian:coast(region=\"20/30/50/45r\", proj=(name=:tmerc, center=35), frame=:ag, res=:low,\n      area=250, land=:lightbrown, ocean=:seashell, shore=:thinnest, scale=0.45, show=true)<img src=\"figures/mapproj/GMT_transverse_merc.png\" alt=\"GMT_transverse_merc\" width=\"500\" class=\"center\"/>The transverse Mercator can also be used to generate a global map - the equivalent of the 360º Mercator map. Using the commandcoast(region=(0,360,-80,80), proj=(name=:tmerc, center=[330 -45]),\n      frame=(annot=30, grid=:auto, axes=:WSne), res=:crude, area=2000, land=:black,\n      water=:lightblue, figsize=9, show=true)<img src=\"figures/mapproj/GMT_TM.png\" alt=\"GMT_TM\" width=\"400\" class=\"center\"/>we made the map illustrated in figure below. Note that when a world map is given (indicated by region=(0360-8080)), the arguments are interpreted to mean oblique degrees, i.e., the 360º range is understood to mean the extent of the plot along the central meridian, while the “south” and “north” values represent how far from the central longitude we want the plot to extend. These values correspond to latitudes in the regular Mercator projection and must therefore be less than 90."
},

{
    "location": "proj_examples.html#Universal-Transverse-Mercator-(UTM)-1",
    "page": "Map projections",
    "title": "Universal Transverse Mercator (UTM)",
    "category": "section",
    "text": ""
},

{
    "location": "proj_examples.html#Oblique-Mercator-1",
    "page": "Map projections",
    "title": "Oblique Mercator",
    "category": "section",
    "text": "Oblique configurations of the cylinder give rise to the oblique Mercator projection. It is particularly useful when mapping regions of large lateral extent in an oblique direction. Both parallels and meridians are complex curves. The projection was developed in the early 1900s by several workers. Several parameters must be provided to define the projection. GMT offers three different definitions:Option -Jo[a|A] or -JO[a|A]:\nName: omerc, obliqueMerc1, GMT code -> Oa (width) oa (scale)\nLongitude and latitude of projection center.\nAzimuth of the oblique equator.\nScale in cm/degree or 1:xxxxx along oblique equator, or map width.\nOption -Jo[b|B] or -JO[b|B]:\nName: omerc2, obliqueMerc2, GMT code -> Ob (width) ob (scale)\nLongitude and latitude of projection center.\nLongitude and latitude of second point on oblique equator.\nScale in cm/degree or 1:xxxxx along oblique equator, or map width.\nOption -Joc|C or -JOc|C:\nName: omercp, obliqueMerc3, GMT code -> Oc (width) oc (scale)\nLongitude and latitude of projection center.\nLongitude and latitude of projection pole.\nScale in cm/degree or 1:xxxxx along oblique equator, or map width.For all three definitions, the upper case A|B|C means we will allow projection poles in the southern hemisphere. These forms are only available when using the GMT letters code. Our example was produced by the commandcoast(region=\"270/20/305/25+r\", proj=(name=:omercp, center=[280 25.5], parallels=[22 69]),\n      frame=:ag, res=:i, area=250, shore=:thinnest, land=:burlywood, water=:azure,\n      rose=\"jTR+w1+f2+l+o0.4\", figsize=12, par=(FONT_TITLE=8, MAP_TITLE_OFFSET=0.12), show=true)<img src=\"figures/mapproj/GMT_obl_merc.png\" alt=\"GMT_obl_merc\" width=\"500\" class=\"center\"/>"
},

{
    "location": "proj_examples.html#Cassini-cylindrical-1",
    "page": "Map projections",
    "title": "Cassini cylindrical",
    "category": "section",
    "text": "This cylindrical projection was developed in 1745 by César-François Cassini de Thury for the survey of France. It is occasionally called Cassini-Soldner since the latter provided the more accurate mathematical analysis that led to the development of the ellipsoidal formulae. The projection is neither conformal nor equal-area, and behaves as a compromise between the two end-members. The distortion is zero along the central meridian. It is best suited for mapping regions of north-south extent. The central meridian, each meridian 90º away, and equator are straight lines; all other meridians and parallels are complex curves. The requirements to define this projection are:Name: cass, Cassini, GMT code -> C (width) c (scale)\nLongitude and latitude of central point.\nScale in cm/degree or as 1:xxxxx, or map width.A detailed map of the island of Sardinia centered on the 8º45’E meridian using the Cassini projection can be obtained by running the command:coast(region=\"7:30/38:30/10:30/41:30r\", proj=(name=:Cassini, center=[8.75 40]),\n      frame=:afg, map_scale=\"jBR+c40+w100+f+o0.4/0.5\", land=:springgreen,\n      res=:high, water=:azure, shore=:thinnest, rivers=(:all,:thinner), figsize=6,\n      par=(:FONT_LABEL,12), show=true)<img src=\"figures/mapproj/GMT_cassini.png\" alt=\"GMT_cassini\" width=\"400\" class=\"center\"/>"
},

{
    "location": "proj_examples.html#Cylindrical-equidistant-1",
    "page": "Map projections",
    "title": "Cylindrical equidistant",
    "category": "section",
    "text": "This simple cylindrical projection is really a linear scaling of longitudes and latitudes. The most common form is the Plate Carrée projection, where the scaling of longitudes and latitudes is the same. All meridians and parallels are straight lines. The projection can be defined by:Name: eqc, PlateCarree, equidistCylindrical, GMT code -> Q (width) q (scale)\nThe central meridian [Middle of your map].\nStandard parallel [Equator].\nScale in cm/degree or as 1:xxxxx, or map width.The first two of these are optional and have defaults. When the standard parallel is defined, the central meridian must be supplied as well.A world map centered on the dateline using this projection can be obtained by running the command:coast(region=:g, proj=:equidistCylindrical, frame=(annot=60, ticks=30, grid=30),\n      res=:crude, area=5000, land=:tan4, water=:lightcyan, figsize=12, show=true)<img src=\"figures/mapproj/GMT_equi_cyl.png\" alt=\"GMT_equi_cyl\" width=\"500\" class=\"center\"/>Different relative scalings of longitudes and latitudes can be obtained by selecting a standard parallel different from the equator. Some selections for standard parallels have practical properties as shown in table:Name lat\nGrafarend and Niermann, minimum linear distortion 61.7º\nRonald Miller Equirectangular 50.5º\nRonald Miller, minimum continental distortion 43.5º\nGrafarend and Niermann 42º\nRonald Miller, minimum overall distortion 37.5º\nPlate Carrée, Simple Cylindrical, Plain/Plane 0º"
},

{
    "location": "proj_examples.html#Cylindrical-equal-area-1",
    "page": "Map projections",
    "title": "Cylindrical equal-area",
    "category": "section",
    "text": "This cylindrical projection is actually several projections, depending on what latitude is selected as the standard parallel. However, they are all equal area and hence non-conformal. All meridians and parallels are straight lines. The requirements to define this projection are:Name: cea, cylindricalEqualArea, GMT code -> Y (width) y (scale)\nThe central meridian.\nThe standard parallel.\nScale in cm/degree or as 1:xxxxx, or map widthWhile you may choose any value for the standard parallel and obtain your own personal projection, there are seven choices of standard parallels that result in known (or named) projections. These are listed in Table.Name lat\nBalthasart 50º\nGall 45º\nHobo-Dyer 37º30’ (= 37.5º)\nTrystan Edwards 37º24’ (= 37.4º)\nCaster 37º04’ (= 37.0666º)\nBehrman 30º\nLambert 0ºFor instance, a world map centered on the 35ºE meridian using the Behrman projection can be obtained by running the command:coast(region=(-145,215,-90,90), proj=(name=:cylindricalEqualArea, center=(35,30)),\n      frame=(annot=45, grid=45), res=:crude, area=10000, water=:dodgerblue,\n      shore=:thinnest, figsize=12, show=true)<img src=\"figures/mapproj/GMT_general_cyl.png\" alt=\"GMT_general_cyl\" width=\"500\" class=\"center\"/>As one can see there is considerable distortion at high latitudes since the poles map into lines."
},

{
    "location": "proj_examples.html#Miller-Cylindrical-1",
    "page": "Map projections",
    "title": "Miller Cylindrical",
    "category": "section",
    "text": "This cylindrical projection, presented by Osborn Maitland Miller of the American Geographic Society in 1942, is neither equal nor conformal. All meridians and parallels are straight lines. The projection was designed to be a compromise between Mercator and other cylindrical projections. Specifically, Miller spaced the parallels by using Mercator’s formula with 0.8 times the actual latitude, thus avoiding the singular poles; the result was then divided by 0.8. There is only a spherical form for this projection. Specify the projection by:Name: mill, Miller, GMT code -> J (width) j (scale)\nOptionally, the central meridian (default is the middle of your map).\nScale in cm/degree or as 1:xxxxx, or map width.For instance, a world map centered on the 90ºE meridian at a map scale of 1:400,000,000 can be obtained as follows:coast(region=(-90,270,-80,90), proj=:Miller, xaxis=(annot=45,grid=45),\n      yaxis=(annot=30,grid=30), res=:crude, area=10000, land=:khaki, water=:azure,\n      shore=:thinnest, scale=\"1:400000000\", show=true)<img src=\"figures/mapproj/GMT_miller.png\" alt=\"GMT_miller\" width=\"500\" class=\"center\"/>"
},

{
    "location": "proj_examples.html#Cylindrical-stereographic-1",
    "page": "Map projections",
    "title": "Cylindrical stereographic",
    "category": "section",
    "text": "The cylindrical stereographic projections are certainly not as notable as other cylindrical projections, but are still used because of their relative simplicity and their ability to overcome some of the downsides of other cylindrical projections, like extreme distortions of the higher latitudes. The stereographic projections are perspective projections, projecting the sphere onto a cylinder in the direction of the antipodal point on the equator. The cylinder crosses the sphere at two standard parallels, equidistant from the equator. The projections are defined by:Name: cyl_stere, cylindricalStereographic, GMT code -> Cyl_stere (width) cyl_stere (scale)\nThe central meridian (uses the middle of the map when omitted).\nThe standard parallel (default is the Equator). When used, central meridian needs to be given as well.\nScale in cm/degree or as 1:xxxxx, or map widthSome of the selections of the standard parallel are named for the cartographer or publication that popularized the projectionName lat\nMiller’s modified Gall 66.159467º\nKamenetskiy’s First 55º\nGall’s stereographic 45º\nBolshoi Sovietskii Atlas Mira or Kamenetskiy’s Second 30º\nBraun’s cylindrical 0ºA map of the world, centered on the Greenwich meridian, using the Gall’s stereographic projection (standard parallel is 45º, Figure Gall’s stereographic projection), is obtained as follows:coast(region=(-180,180,-60,80), proj=(name=:cylindricalStereographic, center=(0,45)),\n      xaxis=(annot=60,ticks=30, grid=30), yaxis=(annot=30,grid=30), res=:crude,\n      area=5000, shore=:black, land=:seashell4, ocean=:antiquewhite1, figsize=12, show=true)<img src=\"figures/mapproj/GMT_gall_stereo.png\" alt=\"GMT_gall_stereo\" width=\"500\" class=\"center\"/>"
},

{
    "location": "proj_examples.html#Miscellaneous-projections-1",
    "page": "Map projections",
    "title": "Miscellaneous projections",
    "category": "section",
    "text": "GMT supports 8 common projections for global presentation of data or models. These are the Hammer, Mollweide, Winkel Tripel, Robinson, Eckert IV and VI, Sinusoidal, and Van der Grinten projections. Due to the small scale used for global maps these projections all use the spherical approximation rather than more elaborate elliptical formulae.In all cases, the specification of the central meridian can be skipped. The default is the middle of the longitude range of the plot, specified by the (region) option."
},

{
    "location": "proj_examples.html#Hammer-1",
    "page": "Map projections",
    "title": "Hammer",
    "category": "section",
    "text": "The equal-area Hammer projection, first presented by the German mathematician Ernst von Hammer in 1892, is also known as Hammer-Aitoff (the Aitoff projection looks similar, but is not equal-area). The border is an ellipse, equator and central meridian are straight lines, while other parallels and meridians are complex curves. The projection is defined by selecting:Name: hamm, Hammer, GMT code -> H (width) h (scale)\nThe central meridian [Middle of your map].\nScale along equator in cm/degree or 1:xxxxx, or map width.A view of the Pacific ocean using the Dateline as central meridian is accomplished thuscoast(region=:g, proj=:Hammer, frame=:g, res=:crude, area=10000, land=:black,\n	  ocean=:cornsilk, figsize=12, show=true)<img src=\"figures/mapproj/GMT_hammer.png\" alt=\"GMT_hammer\" width=\"500\" class=\"center\"/>"
},

{
    "location": "proj_examples.html#Mollweide-1",
    "page": "Map projections",
    "title": "Mollweide",
    "category": "section",
    "text": "This pseudo-cylindrical, equal-area projection was developed by the German mathematician and astronomer Karl Brandan Mollweide in 1805. Parallels are unequally spaced straight lines with the meridians being equally spaced elliptical arcs. The scale is only true along latitudes 4044’ north and south. The projection is used mainly for global maps showing data distributions. It is occasionally referenced under the name homalographic projection. Like the Hammer projection, outlined above, we need to specify only two parameters to completely define the mapping of longitudes and latitudes into rectangular x/y coordinates:Name: moll, Mollweide, GMT code -> W (width) w (scale)\nThe central meridian [Middle of your map].\nScale along equator in cm/degree or 1:xxxxx, or map width.An example centered on Greenwich can be generated thus:coast(region=:d, proj=:Mollweide, frame=:g, res=:crude, area=10000, land=:tomato1,\n	  water=:skyblue, figsize=12, show=true)<img src=\"figures/mapproj/GMT_mollweide.png\" alt=\"GMT_mollweide\" width=\"500\" class=\"center\"/>"
},

{
    "location": "proj_examples.html#Winkel-Tripel-1",
    "page": "Map projections",
    "title": "Winkel Tripel",
    "category": "section",
    "text": "In 1921, the German mathematician Oswald Winkel a projection that was to strike a compromise between the properties of three elements (area, angle and distance). The German word “tripel” refers to this junction of where each of these elements are least distorted when plotting global maps. The projection was popularized when Bartholomew and Son started to use it in its world-renowned “The Times Atlas of the World” in the mid 20th century. In 1998, the National Geographic Society made the Winkel Tripel as its map projection of choice for global maps.Naturally, this projection is neither conformal, nor equal-area. Central meridian and equator are straight lines; other parallels and meridians are curved. The projection is obtained by averaging the coordinates of the Equidistant Cylindrical and Aitoff (not Hammer-Aitoff) projections. The poles map into straight lines 0.4 times the length of equator. To use it you must enterName: win, Winkel, GMT code -> R (width) r (scale)\nThe central meridian [Middle of your map].\nScale along equator in cm/degree or 1:xxxxx, or map width.Centered on Greenwich, the example in Figure Winkel Tripel projection was created by this command:coast(region=:d, proj=:Winkel, frame=:g, res=:crude, area=10000, land=:burlywood4,\n	  water=:wheat1, figsize=12, show=true)<img src=\"figures/mapproj/GMT_winkel.png\" alt=\"GMT_winkel\" width=\"500\" class=\"center\"/>"
},

{
    "location": "proj_examples.html#Robinson-1",
    "page": "Map projections",
    "title": "Robinson",
    "category": "section",
    "text": "The Robinson projection, presented by the American geographer and cartographer Arthur H. Robinson in 1963, is a modified cylindrical projection that is neither conformal nor equal-area. Central meridian and all parallels are straight lines; other meridians are curved. It uses lookup tables rather than analytic expressions to make the world map “look” right [22]. The scale is true along latitudes 38. The projection was originally developed for use by Rand McNally and is currently used by the National Geographic Society. To use it you must enterName: robin, Robinson, GMT code -> N (width) n (scale)\nThe central meridian [Middle of your map].\nScale along equator in cm/degree or 1:xxxxx, or map width.Again centered on Greenwich, the example below was created by this command:coast(region=:d, proj=:Robinson, frame=:g, res=:crude, area=10000, land=:goldenrod,\n	  water=:snow2, figsize=12, show=true)<img src=\"figures/mapproj/GMT_robinson.png\" alt=\"GMT_robinson\" width=\"500\" class=\"center\"/>"
},

{
    "location": "proj_examples.html#Eckert-IV-and-VI-1",
    "page": "Map projections",
    "title": "Eckert IV and VI",
    "category": "section",
    "text": "The Eckert IV and VI projections, presented by the German cartographer Max Eckert-Greiffendorff in 1906, are pseudo-cylindrical equal-area projections. Central meridian and all parallels are straight lines; other meridians are equally spaced elliptical arcs (IV) or sinusoids (VI). The scale is true along latitudes 40º30’ (IV) and 49º16’ (VI). Their main use is in thematic world maps. To select Eckert IV you must use EckertIV while Eckert VI is selected with EckertVI. If no modifier is given it defaults to Eckert VI. In addition, you must enterName: eck4, EckertIV, GMT code -> Kf (width) kf (scale)\nName: eck6, EckertVI, GMT code -> Ks (width) ks (scale)\nThe central meridian [Middle of your map].\nScale along equator in cm/degree or 1:xxxxx, or map width.Centered on the Dateline, the Eckert IV example below was created by this command:coast(region=:d, proj=:EckertIV, frame=:g, res=:crude, area=10000, land=:ivory,\n	  water=:bisque3, shore=:thinnest, figsize=12, show=true)<img src=\"figures/mapproj/GMT_eckert4.png\" alt=\"GMT_eckert4\" width=\"500\" class=\"center\"/>The same script, EckertVI instead of EckertIV, yields the Eckert VI map:coast(region=:d, proj=:EckertVI, frame=:g, res=:crude, area=10000, land=:ivory,\n	  water=:bisque3, shore=:thinnest, figsize=12, show=true)<img src=\"figures/mapproj/GMT_eckert6.png\" alt=\"GMT_eckert6\" width=\"500\" class=\"center\"/>"
},

{
    "location": "proj_examples.html#Sinusoidal-1",
    "page": "Map projections",
    "title": "Sinusoidal",
    "category": "section",
    "text": "The sinusoidal projection is one of the oldest known projections, is equal-area, and has been used since the mid-16th century. It has also been called the “Equal-area Mercator” projection. The central meridian is a straight line; all other meridians are sinusoidal curves. Parallels are all equally spaced straight lines, with scale being true along all parallels (and central meridian). To use it, you need to select:Name: sinu, Sinusoidal, GMT code -> I (width) i (scale)\nThe central meridian [Middle of your map].\nScale along equator in cm/degree or 1:xxxxx, or map width.A simple world map using the sinusoidal projection is therefore obtained bycoast(region=:d, proj=:Sinusoidal, xaxis=(grid=30,), yaxis=(grid=15,), res=:crude,\n      area=10000, land=:coral4, water=:azure3, figsize=12, show=true)<img src=\"figures/mapproj/GMT_sinusoidal.png\" alt=\"GMT_sinusoidal\" width=\"500\" class=\"center\"/>To reduce distortion of shape the interrupted sinusoidal projection was introduced in 1927. Here, three symmetrical segments are used to cover the entire world. Traditionally, the interruptions are at 160ºW, 20ºW, and 60ºE. To make the interrupted map we must call coast for each segment and superpose the results. To produce an interrupted world map (with the traditional boundaries just mentioned) that is 5.04 inches wide we use the scale 12/360 = 0.03333 and offset the subsequent plots horizontally by their widths (140 * 0.03333 and 80 * 0.03333):coast(region=(200,340,-90,90), proj=:Sinusoidal, frame=:g, res=:crude, area=10000,\n      land=:darkred, water=:azure, scale=0.03333)\ncoast!(region=(-20,60,-90,90), frame=:g, res=:crude, area=10000, land=:darkgreen,\n       water=:azure, xoff=4.666)\ncoast!(region=(60,200,-90,90), frame=:g, res=:crude, area=10000, land=:darkblue,\n       water=:azure, xoff=2.6664, show=true)<img src=\"figures/mapproj/GMT_sinus_int.png\" alt=\"GMT_sinus_int\" width=\"500\" class=\"center\"/>The usefulness of the interrupted sinusoidal projection is basically limited to display of global, discontinuous data distributions like hydrocarbon and mineral resources, etc."
},

{
    "location": "proj_examples.html#Van-der-Grinten-1",
    "page": "Map projections",
    "title": "Van der Grinten",
    "category": "section",
    "text": "The Van der Grinten projection, presented by Alphons J. van der Grinten in 1904, is neither equal-area nor conformal. Central meridian and Equator are straight lines; other meridians are arcs of circles. The scale is true along the Equator only. Its main use is to show the entire world enclosed in a circle. To use it you must enterName: vand, VanderGrinten, GMT code -> V (width) v (scale)\nThe central meridian [Middle of your map].\nScale along equator in cm/degree or 1:xxxxx, or map width.Centered on the Dateline, the example below was created by this command:coast(region=:g, proj=:VanderGrinten, xaxis=(grid=30,), yaxis=(grid=15,),res=:crude,\n      land=:lightgray, water=:cornsilk, area=10000, shore=:thinnest, figsize=10, show=true)<img src=\"figures/mapproj/GMT_grinten.png\" alt=\"GMT_grinten\" width=\"400\" class=\"center\"/>"
},

{
    "location": "gallery/tables.html#",
    "page": "AGU",
    "title": "AGU",
    "category": "page",
    "text": "Colored bars Bars 3D Bars 3D peaks\n(Image: ) (Image: ) (Image: )Scatter Cart Scatter Polar Stepped histogram\n(Image: ) (Image: ) (Image: )Flower Snake Skier Daylight terminator\n(Image: ) (Image: ) (Image: )"
},

{
    "location": "gallery/mapprojs.html#",
    "page": "Map projections",
    "title": "Map projections",
    "category": "page",
    "text": "Albers equal-area conic Equidistant conic Lambert conformal conic (American) polyconic\n[(Image: )]Albers conic equal-area projection [(Image: )]Equidistant conic [(Image: )]Lambert conic conformal [(Image: )](American) polyconic projectionLambert Azimuthal Equal-Area (rect) Lambert Azimuthal Equal-Area (hemi) Polar Stereographic Rectangular stereographic\n[(Image: )]Rectangular map [(Image: )]Hemisphere map [(Image: )]Polar Stereographic Map [(Image: )]Rectangular stereographic mapPerspective Orthographic Lambert conformal conic Gnomonic\n[(Image: )]Perspective [(Image: )]Orthographic [(Image: )]Azimuthal Equidistant [(Image: )]GnomonicMercator Transverse Mercator Oblique Mercator Cassini\n[(Image: )]Mercator [(Image: )]Transverse Mercator [(Image: )]Oblique Mercator [(Image: )]Cassini cylindricalCylindrical equidistant Cylindrical equal-area Miller Cylindrical Cylindrical stereographic\n[(Image: )]Cylindrical equidistant [(Image: )]Cylindrical equal-area [(Image: )]Miller Cylindrical [(Image: )]Cylindrical stereographicHammer Mollweide Winkel Tripel Robinson\n[(Image: )]Hammer [(Image: )]Mollweide [(Image: )]Winkel Tripel [(Image: )]RobinsonEckert IV Sinusoidal Sinusoidal int Van der Grinten\n[(Image: )]Eckert IV and VI [(Image: )]Sinusoidal [(Image: )]Sinusoidal [(Image: )]Van der Grinten"
},

{
    "location": "gallery/historic.html#",
    "page": "Historical collection",
    "title": "Historical collection",
    "category": "page",
    "text": "Contour maps Image presentations Spectral estimation\n(Image: ) (Image: ) (Image: )3-D perspective mesh plot 3-D illuminated surface Plotting of histograms\n(Image: ) (Image: ) (Image: )A simple location map A 3-D histogram Time-series along tracks\n(Image: ) (Image: ) (Image: )A geographical bar graph A 3-D RGB color cube Optimal triangulation of data\n(Image: ) (Image: ) (Image: )"
},

{
    "location": "gallery/scripts_agu/colored_bars.html#",
    "page": "Make a bar plot where colors are proportional to bar height",
    "title": "Make a bar plot where colors are proportional to bar height",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/scripts_agu/colored_bars.html#Make-a-bar-plot-where-colors-are-proportional-to-bar-height-1",
    "page": "Make a bar plot where colors are proportional to bar height",
    "title": "Make a bar plot where colors are proportional to bar height",
    "category": "section",
    "text": "bar(rand(15),              # Generate the dataset\n    color=:rainbow,        # The color scale\n    figsize=(14,8),        # The fig size (14 x 8 cm)\n    title=\"Colored bars\",  # The fig title\n    fmt=:png,              # The image format\n    show=true)             # Show the resultAs a one-liner (to facilitate copy-paste):bar(rand(15), color=:rainbow, figsize=(14,8), title=\"Colored bars\", fmt=:png, show=true)<img src=\"../scripts_agu/figs/colored_bars.png\" width=\"500\" class=\"center\"/>"
},

{
    "location": "gallery/scripts_agu/bars_3D.html#",
    "page": "Make a 3D bar plot with constant color",
    "title": "Make a 3D bar plot with constant color",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/scripts_agu/bars_3D.html#Make-a-3D-bar-plot-with-constant-color-1",
    "page": "Make a 3D bar plot with constant color",
    "title": "Make a 3D bar plot with constant color",
    "category": "section",
    "text": "Create a 3x3 gridG = gmt(\"grdmath -R0/2/0/2 -I1 X Y R2 NEG EXP X MUL =\");Plot that grid as 3D prismsbar3(G,                 # \'G\' is the grid created above\n     fill=[0,115,190],  # Fill prisms with this RGB color\n     lw=:thinnest,      # Line thickness (0.25 pt)\n     figsize=14,        # Set fig width of 14 cm\n     fmt=:png,          # The image format\n     show=true)         # Show the resultAs one-liners (to facilitate copy-paste):G = gmt(\"grdmath -R0/2/0/2 -I1 X Y R2 NEG EXP X MUL =\");\nbar3(G, fill=[0,115,190], lw=:thinnest, figsize=14, fmt=:png, show=true)<img src=\"../scripts_agu/figs/bars_3D.png\" width=\"600\" class=\"center\"/>"
},

{
    "location": "gallery/scripts_agu/bars3_peaks.html#",
    "page": "Make a 3D bar plot with colors in function of bar\'s height",
    "title": "Make a 3D bar plot with colors in function of bar\'s height",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/scripts_agu/bars3_peaks.html#Make-a-3D-bar-plot-with-colors-in-function-of-bar\'s-height-1",
    "page": "Make a 3D bar plot with colors in function of bar\'s height",
    "title": "Make a 3D bar plot with colors in function of bar\'s height",
    "category": "section",
    "text": "Create a \'peaks\' gridG = GMT.peaks();      # The grid\ncmap = grd2cpt(G);    # Colormap with the grid\'s data rangePlot that grid as 3D prisms. Here we use the default fig width of 12 cmbar3(G,               # \'G\' is the grid created above\n     lw=:thinnest,    # Line thickness (0.25 pt)\n     color=cmap,      # Paint the prisms with colormap computed from grid\n     fmt=:png,        # The image format\n     show=true)       # Show the resultAs one-liners (to facilitate copy-paste):G = GMT.peaks();    cmap = grd2cpt(G);\nbar3(G, lw=:thinnest, color=cmap, fmt=:png, show=true)<img src=\"../scripts_agu/figs/bars3_peaks.png\" width=\"500\" class=\"center\"/>"
},

{
    "location": "gallery/scripts_agu/flower.html#",
    "page": "Filled flower with pattern",
    "title": "Filled flower with pattern",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/scripts_agu/flower.html#Filled-flower-with-pattern-1",
    "page": "Filled flower with pattern",
    "title": "Filled flower with pattern",
    "category": "section",
    "text": "Draw a flower filled from a pattern in a .jpg file.t = GMT.linspace(0,2pi,360);\nx = cos.(4*t) .* cos.(t);\ny = cos.(4*t) .* sin.(t);\n\nlines([-0.7 -0.25 0], [-1.5 -0.8 0], # The flower stem\n      limits=(-1,1,-1.5,1),          # Fig limits\n      lw=9,                          # Stem\'s line width in points\n      lc=:darkgreen,                 # Stem\'s line color\n      bezier=true,                   # Smooth the stem polyne as a Bezier curve\n      figsize=(14,0),                # Fig size. Second arg = 0 means compute the height keeping aspect ratio\n      frame=:none)                   # Do not plot the frame\nplot!(x, y,\n      fill=(pattern=\"C:/progs_cygw/GMTdev/gmt5/master/test/psxy/tiling2.jpg\",  # Fill pattern file\n      dpi=200),                      # The pattern DPI\n      fmt=:png,                      # The image format\n      show=true)                     # Show the resultAs one-liners (to facilitate copy-paste):t=GMT.linspace(0,2pi,360);\nx = cos.(4*t) .* cos.(t);\ny = cos.(4*t) .* sin.(t);\nlines([-0.7 -0.25 0], [-1.5 -0.8 0], limits=(-1,1,-1.5,1), lw=9, lc=:darkgreen, bezier=true, frame=:none, figsize=(14,0))\nplot!(x, y, fill=(pattern=\"C:/progs_cygw/GMTdev/gmt5/master/test/psxy/tiling2.jpg\", dpi=200), fmt=:png, savefig=\"flower\", show=true)<img src=\"../scripts_agu/figs/flower.png\" width=\"400\" class=\"center\"/>"
},

{
    "location": "gallery/scripts_agu/snake.html#",
    "page": "The snake skier",
    "title": "The snake skier",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/scripts_agu/snake.html#The-snake-skier-1",
    "page": "The snake skier",
    "title": "The snake skier",
    "category": "section",
    "text": "Plot a skier on sinusoid. To run this script one need to have the symbol file \"ski_alpine.eps\"x = GMT.linspace(0, 2pi);  y = cos.(2x)*0.9;\n\nlines(x,y,                           # The data\n      limits=(0,6.5,-1,2.0),         # Fig limits\n      pen=(lw=7,lc=:sienna, arrow=(len=2.2,shape=:arrow, fill=:darkgreen)),  # The \"Snake\"\n      figsize=(16,12),               # Fig size\n      title=\"Double Snake\")\nplot!(3.49, 0.97,                    # Coordinates where to plot symbol\n      symbol=\"kski_alpine/1.7\",      # Fill patern file\n      fill=:black),                  # Fill the symbol in black\n      fmt=:png,                      # The image format\n      show=true)                     # Show the resultAs one-liners (to facilitate copy-paste):x = GMT.linspace(0, 2pi);  y = cos.(2x)*0.9;\nlines(x,y, limits=(0,6.5,-1,2.0), figsize=(16,12), pen=(lw=7,lc=:sienna, arrow=(len=2.2,shape=:arrow, fill=:darkgreen)), title=\"Double Snake\")\nplot!(3.49, 0.97, symbol=\"kski_alpine/1.7\", fill=:black, show=true, fmt=:png)<img src=\"../scripts_agu/figs/snake.png\" width=\"500\" class=\"center\"/>"
},

{
    "location": "gallery/scripts_agu/solar.html#",
    "page": "Daylight terminators",
    "title": "Daylight terminators",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/scripts_agu/solar.html#Daylight-terminators-1",
    "page": "Daylight terminators",
    "title": "Daylight terminators",
    "category": "section",
    "text": "coast(region=:global,         # Global [-180 180 -90 90]\n      proj=:EckertVI,         # Projection\n      resolution=:low,        # Coastline resolution\n      area=5000,              # Do not plot features with area (km^2) lower than this\n      borders=(1,(0.5,:gray)),# Pen settings for national borders\n      water=(175,210,255),    # Ocean\'s color\n      shore=0.5,              # Pen thicknes for coastlines\n      frame=(annot=:a,ticks=:a,grid=:a))  # The frame settings\nsolar!(terminators=(term=:d, date=\"2016-02-09T16:00:00\"), fill=\"navy@95\")\nsolar!(terminators=(term=:c, date=\"2016-02-09T16:00:00\"), fill=\"navy@85\")\nsolar!(terminators=(term=:n, date=\"2016-02-09T16:00:00\"), fill=\"navy@80\")\nsolar!(terminators=(term=:a, date=\"2016-02-09T16:00:00\"), fill=\"navy@80\")As one-liners (to facilitate copy-paste):coast(region=:d, proj=:EckertVI, resolution=:low, area=5000, borders=(1,(0.5,:gray)), water=(175,210,255), shore=0.5, frame=(annot=:a,ticks=:a,grid=:a))\nsolar!(terminators=(term=:d, date=\"2016-02-09T16:00:00\"), fill=\"navy@95\")\nsolar!(terminators=(term=:c, date=\"2016-02-09T16:00:00\"), fill=\"navy@85\")\nsolar!(terminators=(term=:n, date=\"2016-02-09T16:00:00\"), fill=\"navy@80\")\nsolar!(terminators=(term=:a, date=\"2016-02-09T16:00:00\"), fill=\"navy@80\", fmt=:png, show=true)<img src=\"../scripts_agu/figs/solar.png\" width=\"600\" class=\"center\"/>"
},

{
    "location": "gallery/scripts_agu/scatter_cart.html#",
    "page": "Variable symbol size/color Cartesian scatter plot",
    "title": "Variable symbol size/color Cartesian scatter plot",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/scripts_agu/scatter_cart.html#Variable-symbol-size/color-Cartesian-scatter-plot-1",
    "page": "Variable symbol size/color Cartesian scatter plot",
    "title": "Variable symbol size/color Cartesian scatter plot",
    "category": "section",
    "text": "Draw a Cartesian scatter plot with variable symbol size, color and transparencyscatter(rand(100),rand(100),   # Generate data\n        markersize=rand(100),  # Symbol sizes\n        marker=:c,             # Plot circles\n        color=:ocean,          # Color scale\n        zcolor=rand(100),      # Assign color to each symbol\n        alpha=50,              # Set transparency to 50%\n        title=\"Scatter\",       # Fig title\n        figsize=12,            # Set fig size of 12 cm\n        fmt=:png,              # The image format\n        show=true)             # Show the resultAs a one-liner (to facilitate copy-paste):scatter(rand(100),rand(100), markersize=rand(100), marker=:c, color=:ocean, zcolor=rand(100), figsize=12, alpha=50, title=\"Scatter\", fmt=:png, show=true)<img src=\"../scripts_agu/figs/scatter_cart.png\" width=\"500\" class=\"center\"/>"
},

{
    "location": "gallery/scripts_agu/scatter_polar.html#",
    "page": "Variable symbol size/color Polar scatter plot",
    "title": "Variable symbol size/color Polar scatter plot",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/scripts_agu/scatter_polar.html#Variable-symbol-size/color-Polar-scatter-plot-1",
    "page": "Variable symbol size/color Polar scatter plot",
    "title": "Variable symbol size/color Polar scatter plot",
    "category": "section",
    "text": "Draw a Polar scatter plot with variable symbol size, color and transparency. We will use the default color scale (rainbow) and fig size (12 cm).teta = 2pi*rand(150)*180/pi; r = 9*rand(150); ms = r / 10;\n\nscatter(teta, r,                  # The data\n	limits=(0,360,0,10),      # Fig limits\n        xaxis=(annot=45,grid=45), # Annotate and plor grid lines every 45 deg\n        yaxis=(annot=2,grid=2),   # Same but for 2 units in radial direction\n        proj=:Polar,              # Set the polar projection\n        zcolor=teta,              # Assign color to each symbol\n        size=ms,                  # The symbl sizes\n        alpha=25,                 # Set transparency to 50%\n        title=\"Polar scatter\",    # Fig title\n        fmt=:png,                 # The image format\n        show=true)                # Show the resultAs one-liners (to facilitate copy-paste):teta = 2pi*rand(150)*180/pi; r = 9*rand(150); ms = r / 10;\nscatter(teta, r, xaxis=(annot=45,grid=45), yaxis=(annot=2,grid=2), title=\"Polar scatter\", proj=:Polar, limits=(0,360,0,10), zcolor=teta, size=ms, alpha=25, show=true)<img src=\"../scripts_agu/figs/scatter_polar.png\" width=\"400\" class=\"center\"/>"
},

{
    "location": "gallery/scripts_agu/histo_step.html#",
    "page": "Stepped patch histogram",
    "title": "Stepped patch histogram",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/scripts_agu/histo_step.html#Stepped-patch-histogram-1",
    "page": "Stepped patch histogram",
    "title": "Stepped patch histogram",
    "category": "section",
    "text": "Draw a histogram as a stepped patchD1 = histogram(randn(1000), I=:o, bin=0.1);  # Create histogrammed data with bin = 0.1 (I=:o to create the dataset)\nD2 = histogram(randn(500),  I=:o, bin=0.1);\n\nlines(D1,                    # The data\n	  steps=(x=true,),       # Make steps a xx\n	  close=(bot=\"\",),       # Close polygon at the bottom\n	  fill=(pattern=20, bg=:green, dpi=200),    # Set the pattern code, the background color and dpi\n	  figsize=(15,10))       # Set fig size of 15x10 cm\nlines!(D2,                   # Second dataset\n	   steps=(x=true,),       \n	   close=(bot=\"\",),\n	   fill=(pattern=82,bg=:blue,dpi=100),\n	   title=\"Stepped patch histogram\",\n       fmt=:png,             # The image format\n       show=true)            # Show the resultAs one-liners (to facilitate copy-paste):D1 = histogram(randn(1000), I=:o, bin=0.1);\nD2 = histogram(randn(500),  I=:o, bin=0.1);\nlines(D1,  steps=(x=true,), close=(bot=\"\",), fill=(pattern=20,bg=:green,dpi=200), figsize=(15,10))\nlines!(D2, steps=(x=true,), close=(bot=\"\",), fill=(pattern=82,bg=:blue,dpi=100), title=\"Stepped patch histogram\", show=true, fmt=:png)<img src=\"../scripts_agu/figs/histo_step.png\" width=\"500\" class=\"center\"/>"
},

{
    "location": "gallery/historic/ex01.html#",
    "page": "Contour maps",
    "title": "Contour maps",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/historic/ex01.html#Contour-maps-1",
    "page": "Contour maps",
    "title": "Contour maps",
    "category": "section",
    "text": "	# Purpose:    Make two contour maps based on the data in the file osu91a1f_16.nc\n	# GMT progs:  gmtset, grdcontour, basemap, coast\n\n    	gmtset(MAP_GRID_CROSS_SIZE_PRIMARY=0, FONT_ANNOT_PRIMARY=10, PS_CHAR_ENCODING=\"Standard+\")\n	\n	basemap(limits=(0,16.5,0,19.0), frame=0, figscale=1)\n	coast!(limits=:global360, proj=(name=:Hammer, center=0), frame=(ticks=30,),\n	       resolution=:crude,  land=:lightbrown, water=:lightblue, figsize=15,\n	       x_off=0.64, y_off=0.5)\n	grdcontour!(\"@osu91a1f_16.nc\", cont=10, annot=(int=50,labels=(font=7,)), labels=(dist=10,),\n	            range=(-1000,-1), pen=((contour=1,pen=\"thinnest,-\"), (annot=1, pen=\"thin,-\")),\n	            ticks=(gap=(0.25,0.05),))\n	grdcontour!(\"@osu91a1f_16.nc\", cont=10, annot=(int=50,labels=(font=7,)), labels=(dist=10,),\n	            range=(-1,1000), ticks=(gap=(0.25,0.05),))\n\n	coast!(limts=:d, proj=:Hammer, frame=(title=\"Low Order Geoid\", ticks=30), res=:crude,\n	       land=:lightbrown, water=:lightblue, y_off=8.5, figsize=15)\n	grdcontour!(\"@osu91a1f_16.nc\", cont=10, annot=(int=50,labels=(font=7,)), labels=(dist=10,),\n	            range=(-1000,-1), pen=((contour=1,pen=\"thinnest,-\"), (annot=1, pen=\"thin,-\")),\n	            ticks=(gap=(0.25,0.05),labels=\"\"))\n	grdcontour!(\"@osu91a1f_16.nc\", cont=10, annot=(int=50,labels=(font=7,)), labels=(dist=10,),\n	            range=(-1,100), ticks=(gap=(0.25,0.05),labels=\"\"), show=true)See also GMT ex01"
},

{
    "location": "gallery/historic/ex02.html#",
    "page": "Image presentations",
    "title": "Image presentations",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/historic/ex02.html#Image-presentations-1",
    "page": "Image presentations",
    "title": "Image presentations",
    "category": "section",
    "text": "	# Purpose:	Make two color images based gridded data\n	# GMT progs:	gmtset, grd2cpt, grdgradient, grdimage, makecpt, colorbar, pstext\n\n	gmtset(FONT_TITLE=30, MAP_ANNOT_OBLIQUE=0)\n	g_cpt = makecpt(color=:rainbow, T=(-2,14,2))\n	grdimage(\"@HI_geoid_02.nc\", region=(bb=(160,220,20,30), diag=true),\n	         proj=(name=:omercp, center=[190 25.5], parallels=[292 69]),\n	         color=g_cpt, dpi=50, frame=(annot=10,), x_off=3.8, y_off=3.2, figsize=12)\n	colorbar!(g_cpt, pos=(anchor=:RM, offset=(1.5,0), triangles=true, neon=true),\n	          xaxis=(annot=2, label=:GEOID), yaxis=(label=:m,))\n	t_cpt = grd2cpt(\"@HI_topo_02.nc\", cmap=:relief, continuous=true)\n	grdimage!(\"@HI_topo_02.nc\", frame=(title=\"H@#awaiian@# T@#opo and @#G@#eoid@#\", annot=10),\n	          shade=\"+a0\", dpi=50, color=t_cpt, y_off=11, par=(:MAP_TITLE_OFFSET, 1.25))\n	colorbar!(t_cpt, pos=(anchor=:RM, offset=(1.5,0), neon=true), shade=0.3,\n	          xaxis=(annot=2, label=:TOPO), yaxis=(label=:km,))\n	T = text_record([-0.4 7.5; -0.4 3.0], [\"a)\", \"b)\"])\n	text!(T, region=(0,21.6,0,29.94), attrib=(font=(30,\"Helvetica-Bold\"), justify=:CB),\n	      y_off=12, proj=:linear, scale=1, show=1)See also GMT ex02"
},

{
    "location": "gallery/historic/ex03.html#",
    "page": "Image presentations",
    "title": "Image presentations",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/historic/ex03.html#Image-presentations-1",
    "page": "Image presentations",
    "title": "Image presentations",
    "category": "section",
    "text": "	gmt(\"gmtset GMT_FFT kiss\")\n	\n	cpos  = fitcircle(\"@sat_03.xyg\", L=2, F=:m)\n	cposx = cpos[1].data[1,1];		cposy = cpos[1].data[1,2]\n	ppos  = fitcircle(\"@sat_03.xyg\", L=2, F=:n)\n	pposx = ppos[1].data[1,1];		pposy = ppos[1].data[1,2]\n\n	# Now we use \"project\" to gmt project the data in both sat.xyg and ship.xyg\n	# into data.pg, where g is the same and p is the oblique longitude around\n	# the great circle. We use -Q to get the p distance in kilometers, and -S\n	# to sort the output into increasing p values.\n\n	sat_pg  = gmt(@sprintf(\"project @sat_03.xyg -C%f/%f -T%f/%f -S -Fpz -Q\", cposx, cposy, pposx, pposy));\n	ship_pg = gmt(@sprintf(\"project @ship_03.xyg -C%f/%f -T%f/%f -S -Fpz -Q\", cposx, cposy, pposx, pposy));\n	sat_pg  = sat_pg[1].data;\n	ship_pg = ship_pg[1].data;\n\n	# The gmtinfo utility will report the minimum and maximum values for all columns. \n	# We use this information first with a large -I value to find the appropriate -R\n	# to use to plot the .pg data. \n	R = gmtinfo([sat_pg; ship_pg], I=(100,25))\n	R = R[1].text[1]\n	plot(sat_pg, region=R, U=\"L/-1.75i/-1.25i/\\\"Example 3a in Cookbook\\\"\", frame=(axes=:WeSn,\n		xaxis=(annot=500, ticks=100, label=\"Distance along great circle\"), yaxis=(annot=100, ticks=25,\n        label=\"Gravity anomaly (mGal)\")), x_off=5, y_off=3.75, W=:thick, figsize=(20,12.7))\n	plot!(ship_pg, S=\"p0.03i\", savefig=\"example_03a\", show=1)\n\n	# From this plot we see that the ship data have some \"spikes\" and also greatly\n	# differ from the satellite data at a point about p ~= +250 km, where both of\n	# them show a very large anomaly.\n\n	# To facilitate comparison of the two with a cross-spectral analysis using \"spectrum1d\",\n	# we resample both data sets at intervals of 1 km.  First we find out how the data are\n	# typically spaced using $AWK to get the delta-p between points and view it with \"histogram\".\n\n	histogram(diff(ship_pg, dims=1), W=0.1, G=:black, x_off=5, y_off=3.75, frame=0, title=\"Ship\", U=\"L/-1.75i/-1.25i/\\\"Example 3b in Cookbook\\\"\", figsize=7.5)\n	histogram!(diff(sat_pg, dims=1), W=0.1, G=:black, x_off=12.5, frame=0, title=\"Ship\", figsize=7.5)\n\n	# This experience shows that the satellite values are spaced fairly evenly, with\n	# delta-p between 3.222 and 3.418.  The ship values are spaced quite unevenly, with\n	# delta-p between 0.095 and 9.017.  This means that when we want 1 km even sampling,\n	# we can use \"gmt sample1d\" to interpolate the sat data, but the same procedure applied\n	# to the ship data could alias information at shorter wavelengths.  So we have to use\n	# \"filter1d\" to resample the ship data.  Also, since we observed spikes in the ship\n	# data, we use a median filter to clean up the ship values.  We will want to use \"paste\"\n	# to put the two sampled data sets together, so they must start and end at the same\n	# point, without NaNs.  So we want to get a starting and ending point which works for\n	# both of them.  This is a job for gmt gmtmath UPPER/LOWER.\n\n	sampr1 = gmt(\"gmtmath ? -Ca -Sf -o0 UPPER CEIL =\",  [ship_pg[1:1,:]; sat_pg[1:1,:]])\n	sampr2 = gmt(\"gmtmath ? -Ca -Sf -o0 LOWER FLOOR =\", [ship_pg[end:end,:]; sat_pg[end:end,:]])\n\n	# Now we can use sampr1|2 in gmt gmtmath to make a sampling points file for gmt sample1d:\n	samp_x = gmt(@sprintf(\"gmtmath -T%d/%d/1 -N1/0 T =\", sampr1[1].data[1,1], sampr2[1].data[1,1]))\n\n	# Now we can resample the gmt projected satellite data:\n	samp_sat_pg = sample1d(sat_pg, samp_x, N=true)\n\n	# For reasons above, we use gmt filter1d to pre-treat the ship data.  We also need to sample\n	# it because of the gaps > 1 km we found. So we use gmt filter1d | gmt sample1d.  We also\n	# use the -E on gmt filter1d to use the data all the way out to sampr1/sampr2 :\n	t = gmt(@sprintf(\"filter1d -Fm1 -T%d/%d/1 -E\", sampr1[1].data[1], sampr2[1].data[1]), ship_pg)\n	samp_ship_pg = sample1d(t, samp_x, N=true, savefig=\"example_03b\", show=1)\n\n	# Now we plot them again to see if we have done the right thing:\n	plot(sat_pg, region=R, U=\"L/-1.75i/-1.25i/\\\"Example 3c in Cookbook\\\"\", frame=(axes=:WeSn,\n		xaxis=(annot=500, ticks=100, label=\"Distance along great circle\"), yaxis=(annot=100, ticks=25,\n        label=\"Gravity anomaly (mGal)\")), x_off=5, y_off=3.75, W=:thick, figsize=(20,12.7))\n	plot!(samp_ship_pg, S=\"p0.03i\", savefig=\"example_03c\", show=1)\n\n	# Now to do the cross-spectra, assuming that the ship is the input and the sat is the output \n	# data, we do this:\n	t = [samp_ship_pg[1].data[:,2] samp_sat_pg[1].data[:,2]]\n	spects = spectrum1d(t, S=256, D=1, W=true, C=true, N=true)\n \n	# Now we want to plot the spectra. The following commands will plot the ship and sat \n	# power in one diagram and the coherency on another diagram, both on the same page.  \n	# Note the extended use of gmt pstext and gmt psxy to put labels and legends directly on the\n	# plots. For that purpose we often use -Jx1i and specify positions in inches directly:\n\n	plot(spects[1].data[:,[1,16,17]], region=(1,1000,0,1), frame=(axes=WeSn, bg=(240,255,240), xaxis=(annot=1, ticks=3, p=[], label=\"Wavelength (km)\"), yaxis=(annot=0.25, ticks=0.05, label=\"Coherency@+2@+\")), \n		x_off=\"2.5i\", y_off=\"1.5i\", S=\"c0.07i\", G=:purple, E=\"y/0.5p\", figsize=(\"-4il\", \"3.75i\"))\n	\n	text!(text_record(\"Coherency@+2@+\"), F=\"+cTR+f18p,Helvetica-Bold\", D=\"j0.1i\")\n\n	plot!(spects[1].data[:,1:3], region=(1,1000,0.1,10000), frame=(axes=WeSn, title=\"Ship and Satellite Gravity\", bg=(240,255,240), xaxis=(annot=1, ticks=3, p=[]), yaxis=(annot=0.25, ticks=0.05, label=\"Power (mGal@+2@+km)\")), G=:red, S=\"T0.07i\", y_off=\"4.2i\", E=\"y/0.5p\", figsize=(\"-4il\",\"3.75il\"))\n\n	plot!(spects[1].data[:,[1,4,5]], G=:blue, S=\"c0.07i\", E=\"y/0.5p\")\n	text!(text_record(\"Input Power\"), region=(0,4,0,3.75), F=\"+cTR+f18p,Helvetica-Bold\", D=\"j0.1i\", scale=\"1i\")\n\n	leg = text_record([\"S 0.1i T 0.07i red - 0.3i Ship\", \"S 0.1i c 0.07i blue - 0.3i Satellite\"])\n	legend!(leg, D=\"jBL+w1.2i+o0.25i\", F=\"+gwhite+pthicker\", par=(FONT_ANNOT_PRIMARY=\"14,Helvetica-Bold\",), savefig=\"example_03\", show=1)\n\n	# Now we wonder if removing that large feature at 250 km would make any difference.\n	# We could throw away a section of data with $AWK or sed or head and tail, but we\n	# demonstrate the use of \"gmt trend1d\" to identify outliers instead.  We will fit a\n	# straight line to the samp_ship.pg data by an iteratively-reweighted method and\n	# save the weights on output.  Then we will plot the weights and see how things look:\n\n	samp_ship_xw = trend1d(samp_ship_pg, F=:xw, N=\"p2+r\")\n	plot(samp_ship_pg, region=R, U=\"L/-1.75i/-1.25i/\\\"Example 3c in Cookbook\\\"\", frame=(axes=:WeSn,\n		xaxis=(annot=500, ticks=100, label=\"Distance along great circle\"), yaxis=(annot=100, ticks=25,\n        label=\"Gravity anomaly (mGal)\")), x_off=5, y_off=3.75, S=\"p0.03i\", figsize=(20.3,10.2))\n\n	R = gmtinfo(samp_ship_xw, I=(100,1.1))\n	plot!(samp_ship_xw, region=R[1].text[1], y_off=\"4.25i\", frame=(axes=:Wesn, xaxis=(ticks=100,), yaxis=(annot=0.5, ticks=0.1, label=:Weight)), S=\"p0.03i\", figsize=(\"8i\",\"4.25i\"), savefig=\"example_03d\", show=1)See also GMT ex03"
},

{
    "location": "gallery/historic/ex04.html#",
    "page": "A 3-D perspective mesh plot",
    "title": "A 3-D perspective mesh plot",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/historic/ex04.html#A-3-D-perspective-mesh-plot-1",
    "page": "A 3-D perspective mesh plot",
    "title": "A 3-D perspective mesh plot",
    "category": "section",
    "text": "    C = makecpt(cmap=(255,100), range=(-10,10,10), no_bg=true)\n\n    grdcontour(\"@HI_geoid_04.nc\", region=(195,210,18,25), view=(60,30), cont=1,\n               annot=(int=5, labels=(rounded=true,)), labels=(dist=10,),\n               x_off=3, y_off=3, proj=:merc, figscale=1.1)\n    coast!(p=true, frame=(annot=2, axes=:NEsw), land=:black,\n           rose=(inside=true, anchor=:BR, width=2.5, offset=0.25, label=true))\n    grdview!(\"@HI_topo_04.nc\", p=true, region=(195,210,18,25,-6,4),\n             plane=(-6,:lightgray), surftype=(surf=true,mesh=true), Jz=\"0.9\",\n             frame=(axes=:wesnZ, annot=2), zaxis=(annot=2, label=\"Topo (km)\"), y_off=5.6)\n    text!(text_record([7.5 14.0], \"H@#awaiian@# R@#idge@#\"), region=(0,21,0,28),\n          attrib=(font=(60,\"ZapfChancery-MediumItalic\"), justify=:CB),\n          proj=:linear, view=:none, figscale=1, show=1)See also GMT ex04"
},

{
    "location": "gallery/historic/ex05.html#",
    "page": "A 3-D illuminated surface",
    "title": "A 3-D illuminated surface",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/historic/ex05.html#A-3-D-illuminated-surface-1",
    "page": "A 3-D illuminated surface",
    "title": "A 3-D illuminated surface",
    "category": "section",
    "text": " 	Gsombrero = gmt(\"grdmath -R-15/15/-15/15 -I0.3 X Y HYPOT DUP 2 MUL PI MUL 8 DIV COS EXCH NEG 10 DIV EXP MUL =\");\n	C = makecpt(color=128, range=(-5,5), no_bg=true);\n	grdview(Gsombrero, limits=(-15,15,-15,15,-1,1), frame=(axes=\"SEwnZ\", annot=5),\n	        zaxis=(annot=0.5,), plane=(-1, :white), surftype=:surface,\n			shade=(azim=225, norm=\"t0.75\"), figsize=12, zsize=5, view=(120,30))\n\n	title = text_record([7.5 12], \"z(r) = cos (2@~p@~r/8) @~\\\\327@~e@+-r/10@+\");\n	pstext!(title, limits=(0,21,0,28), proj=:linear, view=:none,\n	        attrib=(font=(50,\"ZapfChancery-MediumItalic\"), justify=:CB), scale=1, show=true)See also GMT ex05"
},

{
    "location": "gallery/historic/ex06.html#",
    "page": "Plotting of histograms",
    "title": "Plotting of histograms",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/historic/ex06.html#Plotting-of-histograms-1",
    "page": "Plotting of histograms",
    "title": "Plotting of histograms",
    "category": "section",
    "text": "	rose(\"@fractures_06.txt\", limits=(0,1,0,360), swap_xy=true, sector=\"10r\", radius=:n,\n         fill=:orange, x_off=4, xaxis=(annot=0.2, grid=0.2), yaxis=(annot=30, grid=30),\n         axis=(fill=:lightblue,), figsize=9, pen=1)\n\n	histogram!(\"@v3206_06.txt\", limits=(-6000,0,0,30), y_off=12, x_off=-1.0, pen=1,\n               xaxis=(annot=2000, ticks=1000, label=\"Topography (m)\"),\n               yaxis=(annot=10, ticks=5, label=:Frequency, suffix=\" %\"),\n               axis=(axes=:WSne, title=:Histograms, fill=:lightblue), fill=:orange,\n               kind=(freq=true,), bin=250, proj=:linear, figsize=(12,6), show=true)See also GMT ex06"
},

{
    "location": "gallery/historic/ex07.html#",
    "page": "A simple location map",
    "title": "A simple location map",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/historic/ex07.html#A-simple-location-map-1",
    "page": "A simple location map",
    "title": "A simple location map",
    "category": "section",
    "text": "    coast(region=(-50,0,-10,20), water=:lightblue, land=\"P300/26:FtanBdarkbrown\",\n          res=:low, shore=:thinnest, frame=(annot=10,), proj=:Mercator, figsize=18,\n          par=(:FORMAT_GEO_MAP, :dddF))\n    plot!(\"@fz_07.txt\", pen=\"thinner,-\")\n    scatter!(\"@quakes_07.txt\", h=1, i=\"0,1,2s0.01\", marker=:circle, fill=:red,\n             markerline=:thinnest, MarkerSize=\"3p\")\n    plot!(\"@isochron_07.txt\", pen=\"thin,blue\")\n    plot!(\"@ridge_07.txt\", pen=(:thicker,:orange))\n    legend!(text_record(\"S 0.1i c 0.08i red thinnest 0.3i ISC Earthquakes\"),\n            pos=(inside=true, anchor=:TR, width=5.6, offset=0.5),\n            box=(pen=:thick,inner=:thinner,fill=:white),\n            par=(:FONT_ANNOT_PRIMARY, \"18p,Times-Italic\"))\n    text!(text_record([-43 -5; -43 -8; -7 11], [\"SOUTH\", \"AMERICA\", \"AFRICA\"]),\n          attrib=(font=(20,\"Helvetica-Bold\",\"white=thin\"),), show=1)\nSee also GMT ex07"
},

{
    "location": "gallery/historic/ex08.html#",
    "page": "A 3-D histogram",
    "title": "A 3-D histogram",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/historic/ex08.html#A-3-D-histogram-1",
    "page": "A 3-D histogram",
    "title": "A 3-D histogram",
    "category": "section",
    "text": "    bar3(\"@guinea_bay.nc\", grd=true,\n         frame=(annot=1, axes=:WSneZ, title=:ETOPO5, cube=true),\n         zaxis=(annot=1000, label=\"Topography (m)\"), fill=:lightgreen,\n         lw=:thinnest, proj=:Mercator, figsize=12, zsize=13, view=(200,30))\n    text!(text_record([0.1 4.7], \"This is the surface of cube\"), JZ=true, Z=0,\n          attrib=(font=(24,\"Helvetica-Bold\"),justify=:TL), view=true, show=1)See also GMT ex08"
},

{
    "location": "gallery/historic/ex09.html#",
    "page": "Time-series along tracks",
    "title": "Time-series along tracks",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/historic/ex09.html#Time-series-along-tracks-1",
    "page": "Time-series along tracks",
    "title": "Time-series along tracks",
    "category": "section",
    "text": "    wiggle(\"@tracks_09.txt\", limits=(185,250,-68,-42), proj=:Mercator, figscale=0.27,\n           frame=(axes=:WSne, annot=10,ticks=5, fill=[240 255 240]), G=\"+red -G-blue\",\n           S=\"240/-67/500/@~m@~rad\", scale=800, pen=:thinnest, par=(:FORMAT_GEO_MAP,:dddF))\n    plot!(\"@ridge_09.txt\", pen=:thicker)\n    plot!(\"@fz_09.txt\", pen=\"thinner,-\")\n    # Take label from segment header and plot near coordinates of last record of each track\n    t = gmtconvert(\"@tracks_09.txt\", E=:l)\n    for k = 1:length(t)		t[k].text = [t[k].header]	end\n    text!(t, attrib=(font=(8,\"Helvetica-Bold\"), angle=50, justify=:RM, horizontal=true),\n          offset=(-0.1,-0.1), show=true)See also GMT ex09"
},

{
    "location": "gallery/historic/ex10.html#",
    "page": "A geographical bar graph plot",
    "title": "A geographical bar graph plot",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/historic/ex10.html#A-geographical-bar-graph-plot-1",
    "page": "A geographical bar graph plot",
    "title": "A geographical bar graph plot",
    "category": "section",
    "text": "coast(region=:global, shore=:faint, land=:wheat, ocean=:azure2, area=5000,\n      frame=:none, portrait=false, view=(200,40), figsize=20,\n      proj=(name=:PlateCarree, center=(0,37.5)))\nD = gmtread(\"@languages_10.txt\", table=true)\ntmp = [D[1].data[:,1:2] sum(D[1].data[:, 3:end], dims=2)]\ntext!(tmp, attrib=(font=(30,\"Helvetica-Bold\",\"firebrick=thinner\"), justify=:RM),\n      fill=\"white@30\", offset=(-0.6,0))\ncpt = makecpt(color=(:purple, :blue, :darkgreen, :yellow, :red), range=\"0,1,2,3,4,5\")\nbar3!(D, region=(-180,180,-90,90,0,2500), color=cpt, bar=(width=0.8, Nbands=5),\n      frame=(axes=:WSneZ, annot=:auto, ticks=:auto, title=\"World Languages By Continent\"),\n      zaxis=(annot=500, label=:Languages), G=:purple, W=:thinner, zsize=8,\n      par=(FONT_TITLE=\"30p,Times-Bold\", MAP_TITLE_OFFSET=-1.8, FORMAT_GEO_MAP=:dddF))\nlegend!(\"@legend_10.txt\", JZ=true, pos=(anchor=:LB, width=3.5, justify=:LB, offset=0.5),\n        par=(:FONT,\"Helvetica-Bold\"),\n        box=(fill=:lightgrey, pen=:thinner, shaded=\"-4p/-6p/grey20@40\"), show=true)See also GMT ex10"
},

{
    "location": "gallery/historic/ex11.html#",
    "page": "A 3-D RGB color cube",
    "title": "A 3-D RGB color cube",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/historic/ex11.html#A-3-D-RGB-color-cube-1",
    "page": "A 3-D RGB color cube",
    "title": "A 3-D RGB color cube",
    "category": "section",
    "text": "    gmtset(MAP_TICK_LENGTH_PRIMARY=0, FONT_ANNOT_PRIMARY=\"12p,Helvetica-Bold\")\n    side = 6.35\n\n    plot(\"@cut-here_11.txt\", pen=(:thinnest,\"dot\"), region=(-51,306,0,1071),\n         frame=:none, figsize=(8.9,26.7), x_off=side, y_off=1.2)\n\n    # First, create grids of ascending X and Y and constant 0.\n    # These are to be used to represent R, G and B values of the darker 3 faces of the cube.\n    x_nc = gmt(\"grdmath -I1 -R0/255/0/255 X =\")\n    y_nc = gmt(\"grdmath -I1 -R Y =\")\n    c_nc = gmt(\"grdmath -I1 -R 0 =\")\n\n    grdimage!(x_nc, y_nc, c_nc, figsize=(side,-side), proj=:linear, x_off=1.25)\n    plot!(\"@rays_11.txt\", pen=(:thinner, :white, :dashed))\n    T = text_record([128 128 -45; 102  26 -90; 204  26 -90; 10  140 180],\n                    [\"12p 60\\\\217\"; \"12p 0.4\"; \"12p 0.8\"; \"16p G\"])\n    text!(T, par=(:FONT, :white), attrib=(angle=\"\", font=\"\"))\n    arrows!([0 0 0 128], noclip=true, arrow=(len=0.4, stop=true, endpoint=true),\n            pen=(2,:white), fill=:white)\n\n    grdimage!(x_nc, c_nc, y_nc, figsize=(side,side), proj=:linear, y_off=side)\n    plot!(\"@rays_11.txt\", pen=(:thinner, :white, :dashed))\n    T = text_record([128 128 45; 26 102 0; 26 204 0; 140 10 -90; 100 100 -45],\n                    [\"12p 300\\\\217\"; \"12p 0.4\"; \"12p 0.8\"; \"16p R\"; \"16p V\"]);\n    text!(T, par=(:FONT,:white), attrib=(angle=\"\", font=\"\"))\n\n    arrows!([0 0 128 0], noclip=true, arrow=(len=0.4, stop=true, endpoint=true),\n            pen=(2,:white), fill=:white)\n    arrows!([0 0 90 90], noclip=true, arrow=(len=0.4, stop=true, endpoint=true),\n            pen=(2,:white), fill=:white)\n\n    grdimage!(c_nc, x_nc, y_nc, figsize=(-side,side), proj=:linear, x_off=-side)\n    plot!(\"@rays_11.txt\", pen=(:thinner, :white, :dashed))\n    T = text_record([128 128 135; 102  26 90; 204  26 90; 10  140  0],\n                    [\"12p 180\\\\217\"; \"12p 0.4\"; \"12p 0.8\"; \"16p B\"]);\n    text!(T, par=(:FONT,:white), attrib=(angle=\"\", font=\"\"))\n\n    arrows!([0 0 0 128], noclip=true, arrow=(len=0.4, stop=true, endpoint=true),\n            pen=(2,:white), fill=:white)\n    arrows!([0 0 128 0], noclip=true, arrow=(len=0.4, stop=true, endpoint=true),\n            pen=(2,:white), fill=:white)\n\n    # Second, create grids of descending X and Y and constant 255.\n    # These are to be used to represent R, G and B values of the lighter 3 faces of the cube.\n\n    x_nc = gmt(\"grdmath -I1 -R 255 X SUB =\")\n    y_nc = gmt(\"grdmath -I1 -R 255 Y SUB =\")\n    c_nc = gmt(\"grdmath -I1 -R 255       =\")\n\n    grdimage!(x_nc, y_nc, c_nc, figsize=(-side,-side), proj=:linear, x_off=side, y_off=side)\n    plot!(\"@rays_11.txt\", pen=(:thinner, :black, :dashed))\n    T = text_record([128 128 225; 102  26 270; 204  26 270], [\"12p 240\\\\217\"; \"12p 0.4\"; \"12p 0.8\"])\n    text!(T, attrib=(angle=\"\", font=\"\"))\n\n    grdimage!(c_nc, y_nc, x_nc, figsize=(side,-side), proj=:linear, x_off=side)\n    plot!(\"@rays_11.txt\", pen=(:thinner, :black, :dashed))\n    T = text_record([128 128 -45; 26 102 0; 26 204 0; 100 100  45; 204 66 90], [\"12p 0\\\\217\"; \"12p 0.4\"; \"12p 0.8\"; \"16p S\"; \"16p H\"])\n    text!(T, attrib=(angle=\"\", font=\"\"))\n\n    arrows!([0 0 90 90], noclip=true, arrow=(len=0.4, stop=true, endpoint=true), pen=2, fill=:black)\n    arrows!([204 204 204 76], noclip=true, arrow=(len=0.4, stop=true, endpoint=true), pen=2, fill=:black)\n\n    grdimage!(x_nc, c_nc, y_nc, figsize=(-side,side), proj=:linear, x_off=-side, y_off=side)\n    plot!(\"@rays_11.txt\", pen=(:thinner, :black, :dashed))\n    T = text_record([128 128 135; 26  102 180; 26  204 180; 200 200 225], [\"12p 120\\\\217\"; \"12p 0.4\"; \"12p 0.8\"; \"16p GMT\"])\n    text!(T, attrib=(angle=\"\", font=\"\"), show=1)See also GMT ex11"
},

{
    "location": "gallery/historic/ex12.html#",
    "page": "Optimal triangulation of data",
    "title": "Optimal triangulation of data",
    "category": "page",
    "text": ""
},

{
    "location": "gallery/historic/ex12.html#Optimal-triangulation-of-data-1",
    "page": "Optimal triangulation of data",
    "title": "Optimal triangulation of data",
    "category": "section",
    "text": "    table_5 = gmtread(\"@table_5.11\", table=true)    # The data used in this example\n    net_xy = triangulate(table_5, network=true);\n    plot(net_xy, region=(0,6.5,-0.2,6.5), frame=(axes=:WSNe, annot=2, ticks=1),\n         lw=:thinner, figsize=(7.8, 8), x_off=2.3, y_off=11.8)\n    plot!(table_5, marker=:circle, ms=0.3, fill=:white, MarkerLine=:thinnest)\n    text!(table_5, attrib=(font=(6,), rec_number=0))\n\n    # Then draw network and print the node values\n    plot!(net_xy, frame=(axes=:eSNw, annot=2, ticks=1), lw=:thinner, x_off=8.4)\n    plot!(table_5, marker=:circle, ms=0.08, fill=:black)\n    text!(table_5, attrib=(font=(6,), justify=:LM), fill=:white, pen=\"\",\n          clearance=0.03, offset=(0.2,0), noclip=true)\n\n    # Then contour the data and draw triangles using dashed pen\n    # Use \"gmtinfo\" and \"makecpt\" to make a color palette,\n    # but since gmtinfo -T reports a leading \"-T\" we need to strip it\n    T = gmtinfo(table_5, nearest_multiple=(dz=25, col=2))\n    makecpt(color=:jet, range=T[1].text[1][3:end])  # Make it also the current cmap\n    contour!(table_5, frame=(axes=:WSne, annot=2, ticks=1), pen=:thin,\n             mesh=(:thinnest,:dashed), labels=(dist=2.5,), x_off=-8.4, y_off=-9.3)\n    contour!(table_5, frame=(axes=:eSnw, annot=2, ticks=1), colorize=true, x_off=8.4)\n    text!(text_record([8 20], \"Delaunay Triangulation\"), region=(0,20,0,28),\n          attrib=(font=(30,\"Helvetica-Bold\"), justify=:CB), proj=:linear,\n          figscale=1, x_off=-8.4, show=true)See also GMT ex12"
},

{
    "location": "monolitic.html#",
    "page": "Monolithic",
    "title": "Monolithic",
    "category": "page",
    "text": ""
},

{
    "location": "monolitic.html#Monolithic-1",
    "page": "Monolithic",
    "title": "Monolithic",
    "category": "section",
    "text": "In this mode all GMT options are put in a single text string that is passed, plus the data itself when it applies, to the gmt() command. This function is invoked with the syntax (where the brackets mean optional parameters):[output objects] = gmt(\"modulename optionstring\" [, input objects]);where modulename is a string with the name of a GMT module (e.g., surface, grdimage, psmeca, or even a custom extension), while the optionstring is a text string with the options passed to this module. If the module requires data inputs from the Julia environment, then these are provided as optional comma-separated arguments following the option string. Should the module produce output(s) then these are captured by assigning the result of gmt to one or more comma-separated variables. Some modules do not require an option string or input objects, or neither, and some modules do not produce any output objects.In addition, it can also use two i/o modules that are irrelevant on the command line: the read and write modules. These modules allow to import and export any of the GMT data types to and from external files. For instance, to import a grid from the file relief.nc we runG = gmt(\"read -Tg relief.nc\");We use the -T option to specify grid (g), image (i), PostScript (p), color palette (c), dataset (d) or textset (t). Results kept in Julia can be written out at any time via the write module, e.g., to save the grid Z to a file we usegmt(\"write model_surface.nc\", Z);Because GMT data tables often contain headers followed by many segments, each with their individual segment headers, it is best to read such data using the read module since native Julia import functions risk to choke on such headers."
},

{
    "location": "monolitic.html#How-input-and-output-are-assigned-1",
    "page": "Monolithic",
    "title": "How input and output are assigned",
    "category": "section",
    "text": "Each GMT module knows what its primary input and output objects should be. Some modules only produce output (e.g., psbasemap makes a basemap plot with axes annotations) while other modules only expect input and do not return any items back (e.g., the write module writes the data object it is given to a file). Typically, (i.e., on the command line) users must carefully specify the input filenames and sometimes give these via a module option. Because users of this wrapper will want to provide input from data already in memory and likewise wish to assign results to variables, the syntax between the command line and Julia commands necessarily must differ. For example, here is a basic GMT command that reads the time-series raw_data.txt and filters it using a 15-unit full-width (6 sigma) median filter:gmt filter1d raw_data.txt –Fm15 > filtered_data.txtHere, the input file is given on the command line but input could instead come via the shell’s standard input stream via piping. Most GMT modules that write tables will write these to the shell’s output stream and users will typically redirect these streams to a file (as in our example) or pipe the output into another process. When using GMT.jl there are no shell redirections available. Instead, we wish to pass data to and from the Julia environment. If we assume that the content in raw_data.txt exists in a array named raw_data and we wish to receive the filtered result as a segment array named filtered, we would run the commandfiltered = gmt(\"filter1d -Fm15\", raw_data);This illustrates the main difference between command line and Julia usage: Instead of redirecting output to a file we return it to an internal object (here, a segment array) using standard Julia assignments of output.For data types where piping and redirection of output streams are inappropriate (including most grid file formats) the GMT modules use option flags to specify where grids should be written. Consider a GMT command that reads (x, y, z) triplets from the file depths.txt and produces an equidistant grid using a Green’s function-based spline-in-tension gridding routine:gmt greenspline depths.txt -R-50/300/200/600 -I5 -D1 -St0.3 -Gbathy.ncHere, the result of gridding Cartesian data (-D1) within the specified region (an equidistant lattice from x from -50 to 300 and y from 200 to 600, both with increments of 5) using moderately tensioned cubic splines (-St0.3) is written to the netCDF file bathy.nc. When using GMT.jl we do not want to write a file but wish to receive the resulting grid as a new Julia variable. Again, assuming we already loaded in the input data, the equivalent command isbathy = gmt(\"greenspline -R-50/300/200/600 -I5 -D1 -St0.3\", depths);Note that -G is no longer specified among the options. In this case the wrapper uses the GMT API to determine that the primary output of greenspline is a grid and that this is specified via the -G option. If no such option is given (or given without specifying a filename), then we instead return the grid via memory, provided a left-side assignment is specified. GMT only allows this behavior when called via an external API such as this wrapper: Not specifying the -G option on the command line would result in an error message. However, it is perfectly fine to specify the option -Gbathy.nc in Julia – it simply means you are saving the result to a file instead of returning it to Julia.Some GMT modules can produce more than one output (here called a secondary outputs) or can read more than one input type (i.e., secondary inputs). Secondary inputs or outputs are always specified by explicit module options on the command line, e.g., -Fpolygon.txt. In these cases, the gmt() enforces the following rules: When a secondary input is passed as an object then we must specify the corresponding option flag but provide no file argument (e.g., just -F in the above case). Likewise, for secondary output we supply the option flag and add additional objects to the left-hand side of the assignment. All secondary items, whether input or output, must appear after all primary items, and if more than one secondary item is given then their order must match the order of the corresponding options in option string.Here are two examples contrasting the GMT command line versus gmt() usage. In the first example we wish to determine all the data points in the file all_points.txt that happen to be located inside the polygon specified in the file polygon.txt. On the command line this would be achieved bygmt select points.txt -Fpolygon.txt > points_inside.txtwhile in Julia (assuming the points and polygon already reside in memory) we would runinside = gmt(\"gmtselect -F\", points, polygon);Here, the points object must be listed first since it is the primary data expected.Our second example considers the joining of line segments into closed polygons. We wish to create one file with all closed polygons and another file with any remaining disjointed lines. Not expecting perfection, we allow segment end-points closer than 0.1 units to be connected. On the command line we would rungmt connect all_segments.txt -Cclosed.txt -T0.1 > rest.txtwhere all_segments.txt are the input lines, closed.txt is the file that will hold closed polygons made from the relevant lines, while any remaining lines (i.e., open polygons) are written to standard output and redirected to the file rest.txt. Equivalent Julia usage would beall = gmt(\"read -Td all_segments.txt\");\nrest, closed = gmt(\"gmtconnect -T0.1 -C\", all);Note the primary output (here rest) must be listed before any secondary outputs (here closed) in the left-hand side of the assignment.So far, the gmt() function has been able to understand where inputs and outputs objects should be inserted, provided we follow the rules introduced above. However, there are two situations where more information must be provided. The first situation involves two GMT modules that allow complete freedom in how arguments are passed. These are gmtmath and grdmath, our reverse polish notation calculators for tables and grids, respectively. While the command-line versions require placement of arguments in the right order among the desired operators, the gmt() necessarily expects all inputs at the end of the function call. Hence we must assist the command by placing markers where the input arguments should be used; the marker we chose is the question mark (?). We will demonstrate this need using an example of grdmath. Imagine that we have created two separate grids: kei.nc contains an evaluation of the radial z = bei(r) Kelvin-Bessel function while cos.nc contains a cylindrical undulation in the x-direction. We create these two grids on the command line bygmt grdmath -R-4/4/-4/4 -I256+ X Y HYPOT KEI = kei.nc\ngmt grdmath -R -I256+ X COS = cos.ncLater, we decide we need pi plus the product of these two grids, so we computegmt grdmath kei.nc cos.nc MUL PI ADD = answer.ncIn Julia the first two commands are straightforward:kei = gmt(\"grdmath -R-4/4/-4/4 -I256+ X Y HYPOT KEI\");\nC   = gmt(\"grdmath -R -I256+ X COS\");but when time comes to perform the final calculation we cannot simply doanswer = gmt(\"grdmath MUL PI ADD\", kei, C);since grdmath would not know where kei and C should be put in the context of the operators MUL and ADD. We could probably teach grdmath to discover the only possible solution since the MUL operator requires two operands but none are listed on the command line. The logical choice then is to take kei and C as operands. However, in the general case it may not be possible to determine a unique layout, but more importantly it is simply too confusing to separate all operators from their operands (other than constants) as we would lose track of the mathematical operation we are performing. For this reason, we will assist the module by inserting question marks where we wish the module to use the next unused input object in the list. Hence, the valid command becomesanswer = gmt(\"grdmath ? ? MUL PI ADD\", kei, C);Of course, all these calculations could have been done at once with no input objects but often we reuse results in different contexts and then the markers are required. The second situation arises if you wish to use a grid as argument to the -R option (i.e., to set the current region to that of the grid). On the command line this may look likegmt pscoast -Reurope.nc -JM5i –P -Baf -Gred > map.psHowever, in Julia we cannot simply supply -R with no argument since that is already an established shorthand for selecting the previously specified region. The solution is to supply –R?. Assuming our grid is called europe then the Julia command would becomemap = gmt(\"pscoast -R? -JM5i -P -Baf -Gred\", europe);"
},

{
    "location": "modules.html#",
    "page": "By Modules",
    "title": "By Modules",
    "category": "page",
    "text": ""
},

{
    "location": "modules.html#By-Modules-1",
    "page": "By Modules",
    "title": "By Modules",
    "category": "section",
    "text": "In this mode we access the individual GMT modules directly by their name, and options are set using keyword arguments. The general syntax is (where the brackets mean optional parameters):[output objects] = modulename([cmd::String=\"\",] [argi=[],] opt1=val1, opt2=val2, kwargs...);where modulename is the program name (e.g. coast), cmd is used to transmit a file name for modules that will read data from files and argi is one or, and for certain modules, more data arrays or GMT.jl data types. opti named arguments common to many modules used for example to set the output format. Finally kwargs are keyword parameters used to set the individual module options. But contrary to the Monolithic usage, the one letter GMT option syntax may be replaced by more verbose aliases. To make it clear let us look at couple of examples.coast(region=\"g\", proj=\"A300/30/6c\", axis=\"g\", resolution=\"c\", land=\"navy\")This command creates a map in PotScript file called GMTjl_tmp.ps and save it in your system\'s tmp directory. For comparison, the same command could have been written, using the classical one letter option syntax, as:coast(R=\"g\", J=\"A300/30/6c\", B=\"g\", D=\"c\", G=\"navy\")So, each module defines a set of aliases to the one letter options that are reported in each module man page.Before diving more in the way options may be transmitted into the module, we have to understand what happens with the output image file. By not directly specifying any format we are using the default output image format which is PostScript (actually, except for grdimage -A, the only format that GMT can write). But we can select other formats by using the fmt keyword, for example fmt=\"jpg\", or fmt=:png or fmt=:pdf. In such cases, the ghostscript program (you need to have it installed) will take care of converting the ps file into the selected format. Note that we used either strings (\"\") or symbols (:) to represent the format. Here the rule is we can use symbols for any string argument that can be safely written as a symbol. Example, this is valid =:abc, but this is not =:+a (apparently parser will try to add to a). The use of symbols may be preferred for a question of laziness (less typing).The above example, however, does not use any input data (coast knows how to find its own data). One way of providing it to modules that work on them is to send in a file name with the data to operate on. This examplegrdimage(\"@tut_relief.nc\", shade=\"+ne0.8+a100\", proj=:M12c, axis=:a, show=true)reads a the netCDF grid tut_relief.nc and displays it as a Mercator projected image. The \'@\' prefix is used by GMT to know that the grid file should be downloaded from a server and cached locally. This example introduces also the show=true keyword. It means that we want to see right way the image that has just been created. While it might seem obvious that one wants to see the result, the result might not be ready with only one GMT module call. And that\'s why the GMT philosophy uses a layer cake model to construct potentially highly complex figures. Next example illustrates a slightly more evolved exampletopo = makecpt(color=:rainbow, range=\"1000/5000/500\", Z=[]);\ngrdimage(\"@tut_relief.nc\", shade=\"+ne0.8+a100\", proj=:M12c, axis=:a, color=topo,\n         fmt=:jpg)\ncolorbar!(position=\"jTC+w5i/0.25i+h+o0/-1i\", region=\"@tut_relief.nc\", color=topo,\n       axis=\"y+lm\", fmt=:jpg, show=true)Here we use the makecpt command to compute a colormap object and used it as the value of the color keyword of both grdimage and colorbar modules. The final image is made up of two layers, the first one is the part created by grdimage, which is complemented by the color scale plot performed by colorbar. But since this was an appending operation we HAD to use the ! form. This form tells GMT to append to a previous initiated image. The image layer cake is finalized by the show=true keyword. If our example had more layers, we would have used the same rule: second and on layers use the ! construct and the last is signaled by show=true.By defaultn the image files are written into tmp system directory under the name GMTjl_tmp.ps (remember PostScript is the default format) and GMTjl_tmp.xxx when user specifies a different format with the fmt keyword. It\'s one of this files that shows up when show=true is used. But we may want to save the image file permanently under a different name and location. For that use the keyword savefig=name, where name is relative or full file name.The examples above show also that we didn\'t completely get rid of the compact GMT syntax. For example the shade=\"+ne0.8+a100\" in grdimage means that we are computing the shade using a normalized a cumulative Laplace distribution and setting the Sun direction from the 100 azimuth direction. For as much we would like to simplify that, it\'s just not possible for the time being. To access the (very) high degree of control that GMT provides one need to use its full syntax. As such, readers are redirected to the main GMT documentation to learn about the fine details of those options.Setting line and symbol attributes has received, however, a set of aliases. So, instead of declaring the pen line attributes like -W0.5,blue,–, one can use the aliases lw=0.5, lc=\"blue\", ls=\"–\". An example would be:plot(collect(1:10),rand(10), lw=0.5, lc=:blue, ls=\"--\", fmt=:png, marker=:circle,\n     markeredgecolor=0, size=0.2, markerfacecolor=:red, title=\"Bla Bla\",\n     x_label=:Spoons, y_label=:Forks, show=true)This example introduces also keywords to plot symbols and set their attributes. Also shown are the parameters used to set the image\'s title and labels.But setting pen attributes like illustrated above may be complicated if one has more that one set of graphical objects (lines and polygons) that need to receive different settings. A good example of this is again provided by a coast command. Imagine that we want to plot coast lines as well as country borders with different line colors and thickness. Here we cannot simple state lw=1 because the program wouldn\'t know which of the shore line or borders this attribute applies to. The solution for this is to use tuples as values of corresponding keyword options.coast(limits=[-10 0 35 45], proj=:M12c, shore=(0.5,\"red\"), axis=:a,\n        show=1, borders=(1,(1,\"green\")))Here we used tuples to set the pen attributes, where the tuple may have 1 to 3 elements in the form (width[c|i|p]], [color], [style[c|i|p|]). The borders=(1,(1,\"green\")) option is actually a tuple-in-a-tuple because here we need also to specify the political boundary level to plot (1 = National Boundaries)."
},

{
    "location": "modules.html#Specifying-the-pen-attributes-1",
    "page": "By Modules",
    "title": "Specifying the pen attributes",
    "category": "section",
    "text": "So, in summary, a pen attribute may be set in three different ways:With a text string that follows the width, color, style specs as explained in Specifying pen attributes\nBy using the lw or linewidth keyword where its value is either a number, meaning the line thickness in points, or a string like the width above; the color is set with the lc or linecolor and the value is either a number between [0 255] (meaning a gray shade) or a color name (for example \"red\"); and a ls or linestyle with the value specified as a string (example: \"- -\" plot a dashed line).\nA tuple with one to three elements: ([width], [color], [style]) where each of the elements follow the same syntax as explained in the case (2) above."
},

{
    "location": "modules.html#Specifying-the-axes-1",
    "page": "By Modules",
    "title": "Specifying the axes",
    "category": "section",
    "text": "The axes are controlled by the B or frame or axis keywords. The easiest form it can have is the axes=:a, which means do an automatic annotation of the 4 map boundaries – left, bottom, right and top – axes. To annotate only the left and bottom boundaries, one would do axes=\"a WSne\" (note the space between a and WSne). For a higher level of control the user must really consult the original -B documentation.Other than setting titles and labels with a axes string we can also do it by using the keywords title, x_label and y_label.The figure limits is set with the R, region or limits  keywords. Again, the full docs for this option are explained in -R documentation. But other than the string version, the numeric form region=[xmin xmax ymin ymax] is also permitted. And when dealing with grids, even the region=mygrid.grd is a valid operation. Where mygrid.grd is a GMTgrid type. The plot() function allows a no limits setting, in which case it will default to the data\'s bounding box."
},

{
    "location": "modules.html#Axes-(and-other)-configuration-1",
    "page": "By Modules",
    "title": "Axes (and other) configuration",
    "category": "section",
    "text": "There are almost 150 parameters which can be adjusted individually to modify the appearance of plots or affect the manipulation of data. When a program is run, it initializes all parameters to the GMTdefaults (see more at GMT defaults).  At times it may be desirable to temporarily override some of those defaults. We can do that easily by using any of the keywords conf, par or params, which are recognized by all modules. Its usage follows closely the syntax described at gmt.conf but using Named Tuples. The parameter names are always given in UPPER CASE. The parameter values are case-insensitive unless otherwise noted and can be given as strings or numeric. Provide as many parameters as you want in the named tuple. Examplebasemap(...., conf=(MAP_TICK_LENGTH_PRIMARY=0.25, FORMAT_GEO_MAP=\"ddd:mm:ssF\"))"
},

{
    "location": "modules.html#Specifying-the-figure-size-1",
    "page": "By Modules",
    "title": "Specifying the figure size",
    "category": "section",
    "text": "Figure sizes are automatically set to 12x8 cm for basic case of Cartesian xy plots done with the plot() function but otherwise in general they need to be user specified using the J or proj or projection keywords. See the full doc at -J documentation.  For Cartesian plots one can also use the figsize=width  or figsize=[width height] keyword, where the dimensions are in centimeters. The array form allows also set height or width to 0 to have it recomputed based on the implied scale of the other axis. Use negative sizes to reverse the direction of an axis (e.g., to have y be positive down). If neither of these forms is used, the figure width defaults to 14 cm."
},

{
    "location": "modules.html#The-output-format-1",
    "page": "By Modules",
    "title": "The output format",
    "category": "section",
    "text": "It was referred above that the fmt determines the output format and that the default is PostScript. Actually, the default format is chosen by the contents of the global FMT variable set at the top of the GMT.jl file. Eventually this will evolve to using an environment variable but for the moment users will have to edit that file to set a different default format.A very interesting alternative is to set FMT=\"\", that is to not specify any image format. This will result in NOT saving any file on disk but to keep the PS figure internally stored in the program\'s memory.  In other words, the figure is built and kept in memory only. This allows converting to another format directly without the use of an intermediary disk file. The conversion is performed by the psconvert GMT module that would be used like this (to convert to PDF):psconvert(in_memory=true, adjust=true, format=:f, out_name=\"myfig.pdf\")The issue with this solution, that could be implemented internally without user intervention, is that it currently only works on Windows.Another interesting alternative to a file format is the option to create RGB images with psconvert and return it to Julia as a Image type type.I = psconvert(in_memory=true, adjust=true)but again, so far on Windows only. A cool thing to develop would be the possibility to display this I image with the Images.jl package."
},

{
    "location": "modules.html#Saving-data-to-disk-1",
    "page": "By Modules",
    "title": "Saving data to disk",
    "category": "section",
    "text": "As referred in the Monolithic section, we have two programs to do read and writing. Their module names are gmtread and gmtwrite. These modules allow to import and export any of the GMT data types to and from external files. For instance, to save the grid G stored into a GMTgrid type into the file relief.nc we run gmtwrite(\"relief.nc\", G)Here there is no need to inform about the type of data that we are dealing with because that can be inferred from the type of the numeric argument. There are cases, however, where we may want to save the result of a computation directly on disk instead of assigning it to a Julia variable and latter save it with gmtwrite. For computations that deal with grids that is easy. Just provide ask for an output name using the outgrid keyword, likegrdcut(G, limits=[3 9 2 8], outgrid=\"lixo.grd\");but for table data the GMT programs normally output their results to stdout so if we want to save data directly to disk (as would do the corresponding GMT shell command) we use the write or |> keywords. We can also use this mechanism to append to an existing file, but then we use the append keyword. Use together with the bo option to save as a binary file. The following converts the grid G to x,y,z triplets and save the result in an ASCII disk file.grd2xyz(G, write=\"lixo.xyz\")"
},

{
    "location": "modules.html#How-inputs-are-transmitted-to-modules-1",
    "page": "By Modules",
    "title": "How inputs are transmitted to modules",
    "category": "section",
    "text": "Different modules take different number of inputs (for example grdblend accepts a variable number of grids) and some modules accept primary input and optionally a secondary input (for example the weights  option in grdtrend). The primary input(s) can be sent as text strings with the names of files to be read or as Julia variables holding the appropriate data type, and that as the first argument to the module call. Alternatively, the numeric input can be sent via the data keyword whose value can be a tuple when the expected input is composed by more than one variable. The same applies when an option is expected to receive more than one arguments (for example the three R,G,B in grdview). Examples:grdimage(G, intens=I, J=:M6i, color=C, B=\"1 WSne\", X=:c, Y=0.5, show=1)\n\ngrdimage(data=G, intens=I, J=:M6i, color=C, B=\"1 WSne\", X=:c, Y=0.5, show=1)\n\ngrdview(G, intens=:+, J=:M4i, JZ=\"2i\", p=\"145/35\", G=(Gr,Gg,Gb), B=\"af WSne\", Q=:i, show=1,)"
},

{
    "location": "common_opts.html#",
    "page": "Common options",
    "title": "Common options",
    "category": "page",
    "text": ""
},

{
    "location": "common_opts.html#axis-1",
    "page": "Common options",
    "title": "axis",
    "category": "section",
    "text": "B | frame | axis | xaxis | xaxis2 | yaxis | ...Set map Axes parameters. They are specified by a keyword and a named tuple (but see [1])axis=(axes=..., corners=..., xlabel=..., ylabel=..., annot=..., etc)or separated on a per axes basis by using specific xaxis, yaxis and zaxis that share the same syntax as the generic axis option. The xaxis2 and yaxis2 apply when dealing with secondary axes.Before the rest, note that several modules have axes default settings (scatter, bar, etc...) but if no axes is desired, just use axis=:none. Also useful is the axis=:same to repeat the previously set (from another call) axis specification.By default, all 4 map boundaries (or plot axes) are plotted and annotated. To customize, use the axes keyword that takes as value a tuple with a combination of words. Axes are named left, bottom, right, top and, for the 3D maps, up. Next we have three categories of axes: the annotated and ticked, the ticked and those with no annoations and no tick marks. We call them full, ticks and bare and combine with the axes name using an underscore to glue them. Hence left_full means draw and annotate left axes, whilst top_bare means draw only top axes. The full combination is left|bottom|right|top|up_full|ticks|bare. To not draw a boundary, simply omit the name of it in tuple. Note that the short one single char naming used by GMT is also valid. E.g. axes=:WSn will draw and annotate left and south boundaries and draw but no ticks or annotations the top boundary.If a 3-D base map is selected with view and J=:z, by default a single vertical axes will be plotted at the most suitable map corner. Override the default by using the keyword corners and any combination of corner ids 1234, where 1 represents the lower left corner and the order goes counter-clockwise.Use cube=true to draw the outline of the 3-D cube defined by region this option is also needed to display gridlines in the x-z, y-z planes. Note that for 3-D views the title, if given, will be suppressed. You can paint the interior of the canvas with fill=fill where the fill value can be a color or a pattern.Use noframe=true to have no frame and annotations at all [Default is controlled by the codes].Optionally append pole=\"plon/plat\" (or pole=(plon,plat) to draw oblique gridlines about specified pole [regular gridlines]. Ignored if gridlines are not requested (below) and disallowed for the oblique Mercator projection.For Cartesian plots the slanted=angle allows for the optional angle to plot slanted annotations; the angle is with respect to the horizontal and must be in the -90 <= angle <= 90 range only. This applies to the x-axis only, with the exception of the slanted=:parallel form that plots the y annotations parallel to y-axis.To add a plot title do title=\"My title\" The Frame setting is optional but can be invoked once to override the above defaults.GMT uses the notion of primary (the default) and secondary axes. To set an axes as secondary, use secondary=true (mostly used for time axes annotations).The xaxis yaxis and zaxis specify which axis you are providing information for. The syntax is the same as for the axis keyword but allows fine tuning of different options for the 4 (or 5) axes.To add a label, to an axis use label=\"Label text\" if using the xaxis etc form, or use the xlabel, ylabel and zlabel keywords in the common axis tuple of options.Use Yhlabel=true to force a horizontal label for y-axes (useful for very short labels).If the axis annotation should have a leading text prefix (e.g., dollar sign for those plots of your net worth) you can add prefix=\"prefix\" For geographic maps the addition of degree symbols, etc. is automatic (and controlled by the GMT default setting FORMAT_GEO_MAP). However, for other plots you can add specific units by adding label_unit=\"unit\"Annotations, ticks and grid intervals are specified with the annot, ticks and grid keywords, which take as value the desired stride interval. As an example, annot=10 means annotate at spacing of 10 data units. Alternatively, for linear maps, we can use the special value :auto annotations at automatically determined intervals.annot=:auto, grid=:auto plots both annotations and grid lines with the same spacing,\nannot=:auto, ticks=:auto, grid=:auto adds suitable minor tick intervals,\ngrid=:auto plots grid lines with the same interval as if ticks=:auto was used.The optional phase_add=xx and phase_sub=xx shifts the annotation interval by tht xx amount (positive or negative).The optional annot_unit indicates the unit of the stride and can be any of the ones listed below::year  or :Y (year, plot with 4 digits)\n:year2 or :y (year, plot with 2 digits)\n:month or :O (month, plot using FORMAT_DATE_MAP)\n:month2 or :o (month, plot with 2 digits)\n:ISOweek or :U (ISO week, plot using FORMAT_DATE_MAP)\n:ISOweek2 or :u (ISO week, plot using 2 digits)\nGregorian_week or :r (Gregorian week, 7-day stride from start of week TIME_WEEK_START)\n:ISOweekday or :K (ISO weekday, plot name of day)\n:date or :D (date, plot using FORMAT_DATE_MAP)\n:day_date or :d (day, plot day of month 0-31 or year 1-366, via FORMAT_DATE_MAP)\n:day_week or :R (day, same as d, aligned with TIME_WEEK_START)\n:hour    or :H (hour, plot using FORMAT_CLOCK_MAP)\n:hour2   or :h (hour, plot with 2 digits)\n:minute  or :M (minute, plot using FORMAT_CLOCK_MAP)\n:minute2 or :m (minute, plot with 2 digits)\n:second  or :S (second, plot using FORMAT_CLOCK_MAP)\n:second2 or :s (second, plot with 2 digits).Note for geographic axes m and s instead mean arc minutes and arc seconds. All entities that are language-specific are under control by GMT_LANGUAGE. For custom annotations and intervals, let intervals be given as custom=\"intfile\", where intfile contains any number of records with coord * *type [label]. Here, type is one or more letters from a or i, f, and g. For a or i you must supply a label that will be plotted at the coord location.For non-geographical projections: Give negative scale (in proj=\"x scale\" or axis length (in proj=\"X map width\" to change the direction of increasing coordinates (i.e., to make the y-axis positive down).For log10 axes: Annotations can be specified in one of three ways: stride can be 1, 2, 3, or -n. Annotations will then occur at 1,     1-2-5, or 1-2-3-4-...-9, respectively; for -n we annotate every     n\'t magnitude. This option can also be used for the frame and grid intervals. \nUse log=true, then log10 of the tick value is plotted at every integer log10 value.\nUse 10log=true, then annotations appear as 10 raised to log10 of the tick value.For power axes: Annotations can be specified in one of two ways:stride sets the regular annotation interval.\nUse exp=true, then, the annotation interval is     expected to be in transformed units, but the annotation value will     be plotted as untransformed units. E.g., if stride = 1 and power     = 0.5 (i.e., sqrt), then equidistant annotations labeled 1-4-9...  will appear.Finally, if your axis is in radians you can use multiples or fractions of pi to set such annotation intervals. The format is pi=n or pi=(n,m), for an optional integer n and optional m fractions 2, 3, or 4.These GMT parameters can affect the appearance of the map boundary: MAP_ANNOT_MIN_ANGLE, MAP_ANNOT_MIN_SPACING, FONT_ANNOT_PRIMARY, FONT_ANNOT_SECONDARY, MAP_ANNOT_OFFSET_PRIMARY, MAP_ANNOT_OFFSET_SECONDARY, MAP_ANNOT_ORTHO, MAP_FRAME_AXES, MAP_DEFAULT_PEN, MAP_FRAME_TYPE, FORMAT_GEO_MAP, MAP_FRAME_PEN, MAP_FRAME_WIDTH, MAP_GRID_CROSS_SIZE_PRIMARY, MAP_GRID_PEN_PRIMARY, MAP_GRID_CROSS_SIZE_SECONDARY, MAP_GRID_PEN_SECONDARY, FONT_TITLE, FONT_LABEL, MAP_LINE_STEP, MAP_ANNOT_OBLIQUE, FORMAT_CLOCK_MAP, FORMAT_DATE_MAP, FORMAT_TIME_PRIMARY_MAP, FORMAT_TIME_SECONDARY_MAP, GMT_LANGUAGE, TIME_WEEK_START, MAP_TICK_LENGTH_PRIMARY, and MAP_TICK_PEN_PRIMARY"
},

{
    "location": "common_opts.html#Axis-options-table-1",
    "page": "Common options",
    "title": "Axis options table",
    "category": "section",
    "text": "The entire parameters collection is displayed in the following tablekeyword value type meaning\nnone true Bool Do not plot any axis\naxes left_full Str or Symb Annot and tick left axis\n left_ticks Str or Symb Tick left axis\n left_bare Str or Symb Just draw left axis\n bottom_full Str or Symb Same for bottom axis\n right_full Str or Symb Same for right axis\n top_full Str or Symb Same for top axis\n up_full Str or Symb Same for z axis\n WESNwesn... Str or Symb The classic GMT syntax\ncorners 1234 Str or Symb Vertical axis\nscondary true or false Bool Secondary axis info\nfill color Str or Symb Paint interior\ncube anything Sym or Bool Draw outline of the 3-D cube\nnoframe anything Sym or Bool No frame and annotations at all\npole lon lat Str or Tuple Draw oblique gridlines abot pole\ntitle the title Str or Symb Add a plot title\nlabel axis label Str or Symb Add a label to an axis\nYhlabel y-axis hlabel Str or Symb Horizontal label for y-axes\nprefix annot prefix Str or Symb Annot leading text prefix\nsuffix annot suffix Str or Symb Annot trailing text suffix\nxlabel x-axis label Str or Symb Add a label to X axis\nylabel y-axis label Str or Symb Add a label to Y axis\nzlabel z-axis label Str or Symb Add a label to Z axis\nseclabel second label Str or Symb Add a seconadry label to X\nannot annot interval Symb or Num Annot stride interval\nticks tick interval Symb or Num Tick interval\ngrid grid interval Symb or Num Grid lines interval\nslanted x-annot angle Symb or Num Angle of slanted annotations\nphase_add xx Numb Shifts right the annot interval\nphase_sub xx Numb Shifts left the annot interval\nannot_unit annot unit Str or Symb Unit of the stride\ncustom custom annot Str or Symb Custom annotations file\npi n or (n,m) Num or Tuple If axis is in radians\nscale log Str or Symb log10 of the tick value\n 10log Str or Symb Annot as 10 raised to log10\n exp Str or Symb Annot interval in transformed units[1] However, the original GMT compact syntax can also be used. I.e, axis=:a, or frame=:WSen    or frame=\"a1Of1d WS\" also work.-B GMT doc"
},

{
    "location": "common_opts.html#Examples-1",
    "page": "Common options",
    "title": "Examples",
    "category": "section",
    "text": "Demonstrates use of dual (left vs right, bottom vs top) Cartesian axis labelsbasemap(limits=(0,50,0,7), figsize=8,\n        xaxis=(annot=:auto, ticks=:auto, label=\"Bottom Label\", seclabel=\"Top label\"),\n        yaxis=(annot=:auto, ticks=:auto, label=\"Left label\", seclabel=\"Right label\"), show=1)we can obtain the same result with a slightly shorter version of the above that shows how can mix frame and xaxis calls.basemap(limits=(0,50,0,7), figsize=8,\n        frame=(annot=:auto, ticks=:auto, xlabel=\"Bottom Label\", ylabel=\"Left label\"),\n        xaxis=(seclabel=\"Top label\",), yaxis=(seclabel=\"Right label\",), show=1)Show inside labeling (use default fig size).basemap(limits=(0,13,0,10), frame=(annot=2, ticks=0.5), par=(:MAP_FRAME_TYPE,:inside), show=1)Show horizontal and vertical annotationsbasemap(region=[0 1000 0 1000], figsize=5,\n        frame=(axes=(:left_full,:bottom_full,:right_full,:top_full), annot=200,\n               ticks=100, xlabel=:horizontal, ylabel=:vertical),\n        par=(FONT_ANNOT_PRIMARY=10, FONT_LABEL=16, MAP_ANNOT_ORTHO=:we))\n\nbasemap!(frame=(axes=(:left_full,:bottom_full,:right_full,:top_full), annot=200,\n                ticks=100, xlabel=:horizontal, ylabel=:vertical),\n         par=(FONT_ANNOT_PRIMARY=10, FONT_LABEL=16, MAP_ANNOT_ORTHO=:sn),\n         x_offset=9, show=1)Show Yhlabel for horizontal labels for y-axis basemap(region=\"-30/30/-20/20\", figsize=(12,8),\n        frame=(annot=:a, ticks=:a, xlabel=\"Standard horizontal label\", Yhlabel=\"@~Y(q)@~\",\n               title=\"Vertical Y-axis label\"), show=1)"
},

{
    "location": "common_opts.html#limits-1",
    "page": "Common options",
    "title": "limits",
    "category": "section",
    "text": "R | region | limits | xlimits,ylimits\nxmin, xmax, ymin, and ymax specify the region of interest (aka, BoundingBox). For geographic  regions, these limits correspond to west, east, south, and north and you may specify them in  decimal degrees or in [+|-]dd:mm[:ss.xxx][W|E|S|N] format.\nUsing the form region = [xmin xmax ymin ymax] or the equivalent tuple alternative covers the largest  chunk of user cases. However, for fine tunning the limits setting we have an extended syntax that  involves the use of Named Tuples. Next needed case is when one want/need to specify the BoundingBox  with the (xmin, ymin, xmax, ymax) corners. As mentioned, this involves a NamedTuple keyword that  can have any of the following members name/value:\nR=xx, region=xx or limits=xx – where xx is a string is interpreted as a GMT -R syntax string.\nbb, lmits, region – a four (or six) elements array or tuple with xmin, xmax, ymin, ymax [zmin zmax]\nbb=global or bb=:d – shorthand for *bb=[-180 180 -90 90] \nbb=global360 or bb=:g – shorthand for *bb=[0 360 -90 90] \nbb_diag, limits_diag, region_diag or LLUR – a four elements array with xmin, ymin, xmax, ymax\ndiag=true – makes the bb mean bb_diag\ncont or continents=continent name where continent name is any of: Africa, Antarctica, Asia, Europe, Oceania,  North America or South America (or the shorthands: AF, AN, AS, EU,  OC, NA, SA). This sets the geographic limts covered by these continents.\nISO=code – use ISO country codes from the Digital Chart of the World. Append one or more comma-separated  countries using the 2-character ISO 3166-1 alpha-2 convention. To select a state of a country  (if available), append .state, e.g, US.TX for Texas.\nadjust=xx – where xx is either a String, a Number or an Array/Tuple to set an inc, xinc yinc,  or winc einc sinc ninc to adjust the region to be a multiple of these steps steps.\npad=xx, extend=xx or expand=xx – same as above but extend the region outward by adding these  increments instead.\nunit=val – use Cartesian projected coordinates compatible with the chosen projection. Append the  length unit (e.g. \"k\" for kilometer). These coordinates are internally converted to the corresponding  geographic (longitude, latitude) coordinates for the lower left and upper right corners. This form is  convenient when you want to specify a region directly in the projected units (e.g., UTM meters). For  Cartesian data in radians you can also use [+|-][s]pi[f], for optional integer scales s and fractions f.\nThe xlimts, ylimits is used to break the specification into two pairs but it won\'t support all the  options of the limits functionality.\n-R GMT doc"
},

{
    "location": "common_opts.html#proj-1",
    "page": "Common options",
    "title": "proj",
    "category": "section",
    "text": "J | proj : projection : proj=<parameters>Select map projection. The following table describes the projections available as well as extra parameters needed to set a specific projection. If the proj argument is a string then it is assumed that it contains a full GMT -J style specification. Please refer to the GMT manual to learn how that works. -J GMT doc In the table, the center column indicates if a projection needs to set a projection center or if that is optional (when the parameters are under []). Several projections not to set also the standard paralalle(s). Those are indicated by a non-empty parallels column. Still, other projections accept an optional horizon parameter, which is an angle that specifies the max distance from projection center (in degrees, <= 180, default 90) that is plotted.Given the different needs to specify a projection we can either use a simple form when only the projection name is required, e.g. proj=Mercator or in the more elaborated cases, a named tuple with fields name, center, horizon, parallels. An example of this later case would be to set an Oblique Mercator projection with center at 280ºW, 25.5ºN and standard parallels at 22 and 60ºN. We would do that with proj=(name=:omercp, center=[280 25.5], parallels=[22 69]). Note that we can either use arrays or tuples to specify pairs of values.In case the central meridian is an optional parameter and it is being omitted, then the center of the longitude range given by the limits option is used. The default standard parallel is the equator. For linear (Cartesian) projections one can use proj=:linear but the simplest is just to omit the projection setting, which will default to a fig with of 12 cm. To set other fig dimensions, use the figsize specification with figsize=(width, height) (both numeric or string) or just figsize=width and the height is computed automatically from the fig limits aspect ratio. We can also specify the scale separately: e.g. figscale=x, figscale=1:xxxx. As mentioned, when no size is provided a default width value of 12 cm is assumed.When specifying a figsize, the UNIT is cm by default but it can be overridden by appending i, or p to the scale or width values. Append h, +, or - to the given width if you instead want to set map height, the maximum dimension, or the minimum dimension, respectively [Default is w for width]. Off course, when these settings are used, the argument to figsize must be in the form of strings.The ellipsoid used in the map projections is user-definable by editing the gmt.conf file in your home directory. 73 commonly used ellipsoids and spheroids are currently supported, and users may also specify their own custom ellipsoid parameters [Default is WGS-84]. Several GMT parameters can affect the projection: PROJ_ELLIPSOID, GMT_INTERPOLANT, PROJ_SCALE_FACTOR, and PROJ_LENGTH_UNIT; see the gmt.conf man page for details.See GMT Map Projections for a list of projection examples name center horizon parallels GMT code Description\naea, Alberts lon_0lat_0 NA lat_1lat_2 Blon_0lat_0lat_1lat_2 Albers conic equal area\naeqd, azimuthalEquidistant lon_0lat_0 yes NA Elon_0lat_0 Azimuthal equidistant\nCyl_stere, cylindricalStereographic lon_0lat_0 NA NA Cyl_sterelon_0lat_0 Cylindrical stereographic\ncass, Cassini lon_0lat_0 NA NA Clon_0lat_0 Cassini cylindrical\ncea, cylindricalEqualarea lon_0lat_0 NA NA Ylon_0lat_0 Cylindrical equal area\neqdc, conicEquidistant lon_0lat_0 NA lat_1lat_2 Dlon_0lat_0lat_1lat_2 Equidistant conic\neqc, PlateCarree, equidistant lon_0lat_0 NA NA Qlon_0lat_0 Equidistant cylindrical\neck4, EckertIV lon_0 NA NA Kflon_0 Eckert IV equal area\neck6, EckertVI lon_0 NA NA Kslon_0 Eckert VI equal area\ngnom, Gnomonic lon_0lat_0 yes NA Flon_0lat_0 Azimuthal gnomonic\nhamm, Hammer lon_0 NA NA Hlon_0 Hammer equal area\nlaea, lambertAzimuthal lon_0lat_0 yes NA Alon_0lat_0 Lambert azimuthal equal area\nlcc, lambertConic lon_0lat_0 NA lat_1lat_2 Llon_0lat_0lat_1lat_2 Lambert conic conformal\nlin, Linear  NA NA X[l pexp\nmerc, Mercator lon_0lat_0 NA NA Mlon_0lat_0 Mercator cylindrical\nmill, Miller lon_0 NA NA Jlon_0 Miller cylindrical\nmoll, Molweide lon_0 NA NA Wlon_0 Mollweide\nomerc, obliqueMerc1 lon_0lat_0 NA azim Oalon_0lat_0azim Oblique Mercator, 1: origin and azim\nomerc2, obliqueMerc2 lon_0lat_0 NA lon_1lat_1 Oblon_0lat_0lon_1lat_1 Oblique Mercator, 2: two points\nomercp, obliqueMerc3 lon_0lat_0 NA lon_plat_p Oclon_0lat_0lon_plat_p Oblique Mercator, 3: origin and pole\northo, Orthographic lon_0lat_0 yes NA Glon_0lat_0 Azimuthal orthographic\npoly, PolyConic lon_0lat_0 NA NA Polylon_0lat_0 (American) polyconic\nrobin, Robinson lon_0 NA NA Nlon_0 Robinson\nstere, Stereographic lon_0lat_0 yes NA Slon_0lat_0 General stereographic\nsinu, Sinusoidal lon_0 NA NA Ilon_0 Sinusoidal equal area\ntmerc, transverseMercator lon_0lat_0 NA NA Tlon_0lat_0 Transverse Mercator\nutmxx, UTMxx NA NA NA Uzone Universal Transverse Mercator (UTM)\nvand, VanDerGritten lon_0 NA NA Vlon_0 Van der Grinten\nwin, WinkelTripel lon_0 NA NA Rlon_0 Winkel Tripel-J GMT doc"
},

{
    "location": "common_opts.html#stamp-1",
    "page": "Common options",
    "title": "stamp",
    "category": "section",
    "text": "U | stamp | time_stamp : stamp=(just=\"code\", pos=(dx,dy), label=\"label\", com=true)\nDraw Unix System time stamp on plot. By adding [just\\ ]\\ /dx/dy/, the  user may specify the justification of the stamp and where the stamp  should fall on the page relative to lower left corner of the plot.  For example, BL/0/0 will align the lower left corner of the time  stamp with the lower left corner of the plot [LL]. Optionally, append a  label, or c (which will plot the command string.). The GMT  parameters MAP\\_LOGO, MAP\\_LOGO\\_POS, and  FORMAT\\_TIME\\_STAMP can affect the appearance; see the  gmt.conf man page for details. The time string will be in the  locale set by the environment variable TZ (generally local time).\n-U GMT doc"
},

{
    "location": "common_opts.html#verbose-1",
    "page": "Common options",
    "title": "verbose",
    "category": "section",
    "text": "V | verbose : verbose=true | verbose=level\nSelect verbose mode, which will send progress reports to stderr.  Choose among 6 levels of verbosity; each level adds more messages:\nq – Complete silence, not even fatal error messages are produced.\nn – Normal verbosity: produce only fatal error messages.\nc – Produce also compatibility warnings (same as when verbose is omitted).\nv – Produce also warnings and progress messages (same as verbose only).\nl – Produce also detailed progress messages.\nd – Produce also debugging messages."
},

{
    "location": "common_opts.html#x_off-1",
    "page": "Common options",
    "title": "x_off",
    "category": "section",
    "text": "X | x_off  | x_offset : x_off=[] | x_off=x-shift | x_off=(shift=x-shift, mov=\"a|c|f|r\")"
},

{
    "location": "common_opts.html#y_off-1",
    "page": "Common options",
    "title": "y_off",
    "category": "section",
    "text": "Y | y_off  | y_offset : y_off=[] | y_off=y-shift | y_off=(shift=y-shift, mov=\"a|c|f|r\")\nShift plot origin relative to the current origin by (x-shift, y-shift) and optionally append the  length unit (c, i, or p). This second case (with units) implies that x-shift must be a  string. To make non-default sifts, use the form x_off=(shift=x-shift, mov=\"a|c|f|r\") where a  shifts the origin back to the original position after plotting; c centers the plot on the center of  the paper (optionally add shift); f shifts the origin relative to the fixed lower left corner of the  page, and r [Default] to move the origin relative to its current location. For overlays the default  (x-shift, y-shift) is (r0), otherwise it is (r1i). When x_off or y_off are used without any  further arguments, the values from the last use of that option in a previous GMT command will be used.  Note that x_off and y_off can also access the previous plot dimensions w and h and construct  offsets that involves them. For instance, to move the origin up 2 cm beyond the height of the previous  plot, use y_off=\"h+2c\". To move the origin half the width to the right, use x_off=\"w/2\"."
},

{
    "location": "common_opts.html#perspective-1",
    "page": "Common options",
    "title": "perspective",
    "category": "section",
    "text": "p | view | perspective : view=(azim, elev)\n Selects perspective view and sets the azimuth and elevation of the viewpoint (180,90). When view  is used in consort with Jz or JZ, a third value can be appended which indicates at which  z-level all 2D material, like the plot frame, is plotted (in perspective). [Default is at the bottom  of the z-axis]. \n-p GMT doc"
},

{
    "location": "common_opts.html#interp-1",
    "page": "Common options",
    "title": "interp",
    "category": "section",
    "text": "n | interp | interpol : interp=\"[b|c|l|n][+a][+bBC][+c][+tthreshold]\"\n  Select grid interpolation mode by adding b for B-spline smoothing, c for bicubic interpolation,  l for bilinear interpolation, or n for nearest-neighbor value (for example to plot categorical data).  Optionally, append +a to switch off antialiasing (where supported). Append +bBC to override the boundary  conditions used, adding g for geographic, p for periodic, or n for natural boundary conditions. For the  latter two you may append x or y to specify just one direction, otherwise both are assumed. Append +c  to clip the interpolated grid to input z-min/max [Default may exceed limits]. Append +tthreshold to  control how close to nodes with NaNs the interpolation will go. A threshold of 1.0 requires all (4 or 16)  nodes involved in interpolation to be non-NaN. 0.5 will interpolate about half way from a non-NaN value;  0.1 will go about 90% of the way, etc. [Default is bicubic interpolation with antialiasing and a threshold  of 0.5, using geographic (if grid is known to be geographic) or natural boundary conditions].\n-n GMT doc"
},

{
    "location": "arrows_control.html#",
    "page": "Vector Attributes",
    "title": "Vector Attributes",
    "category": "page",
    "text": ""
},

{
    "location": "arrows_control.html#Vector-Attributes-1",
    "page": "Vector Attributes",
    "title": "Vector Attributes",
    "category": "section",
    "text": "Set arrow parameters. They are specified by a keyword (arrow) and a named tuple. Several modifiers may be provided for specifying the placement of vector heads, their shapes, and the justification of the vector. Below, left and right refers to the side of the vector line when viewed from the start point to the end point of a segment:arrow=(length=..., start=..., shape=..., pen=..., norm=..., etc)len=xx or length=xx\n Length of the vector head. xx may be numeric, a string with the length and the  units attached (as in len=\"2c\") or a tuple with length and units as in len=(2,:centimeters)\nangle=xx\n Sets the angle of the vector head apex [default 30]\nstart=true\n Places a vector head at the beginning of the vector path [none]. Optionally, set\nstart=:line – For a terminal line\nstart=:arrow – For a arrow (the default)\nstart=:circle – For a circle\nstart=:tail – For a tail\nstart=:open_arrow – For a plain open arrow\nstart=:open_tail – For a plain open tail\nstart=:left_side – For draw the left half-side\nstart=:right_side – For draw the right half-side\nstop=true\n Places a vector head at the end of the vector path [none]. Optionally, set the same values  as the start case.\nmiddle=true\n Places a vector head at the mid-point of the vector path [none]. Optionally, set the same  values as the start case but it can\'t be used with the start and stop options. But it accepts two  further options:\nmiddle=:forward\n Forward direction of the vector [the default]\nmiddle=:reverse\n Reverse direction of the vector.\nfill=color\n Sets the vector head fill. The color value may contain any of valid ways ways of  specifying color.\nfill=:none\n Turns off vector head fill.\nshape=xx\n Sets the shape of the vector head (range -2/2). Determines the shape of the head of a vector.  Normally (i.e., for vector_shape = 0), the head will be triangular, but can be changed to an arrow (1) or  an open V (2). Intermediate settings give something in between. Negative values (up to -2) are allowed as  well. Shortcuts available as:\nshape=:triang     same as shape=0\nshape=:arrow      same as shape=1\nshape=:V          same as shape=2\nhalf_arrow=:left\n Draw half-arrows, using only the left side of specified heads [default is both sides].\nhalf_arrow=:right\n Draw half-arrows, using only the right side of specified heads [default is both sides].\nnorm=xx\n Scales down vector attributes (pen thickness, head size) with decreasing length, where vector  plot lengths shorter than norm will have their attributes scaled by length/norm. xx may be a number or a  string (number&unit).\noblique_pole=(plon,plat) – Specifies the oblique pole for the great or small circles.\npen=pen\n Sets the vector pen attributes. The pen value may contain any of valid ways of specifying pens.  If pen has a leading \'-\' (and hence the pen value must be a string) then the head outline is not drawn.\nang1_ang2=true or start_stop=true\n Means that input angle, length data instead represent the start and stop opening angles of the arc  segment relative to the given point.\ntrim=trim\n Shift the beginning or end point (or both) along the vector segment by the given trim. To  select begin or end prepend a \'b\' or a \'e\' to the trim value (hence it must be a string). Append suitable  unit (c, i, or p). If the modifiers b|e are not used then trim may be two values separated by a slash, which  is used to specify different trims for the beginning and end. Positive trims will short the vector while  negative trims will lengthen it [no trim].In addition, all but circular vectors may take these options:justify=??\n Determines how the input x,y point relates to the vector. Choose from\njustify=:beginning          – The default\njustify=:end\njustify=:center\nendpoint=true\n Means that input angle and length are provided instead the x, y coordinates of the vector end point.Finally, Cartesian vectors may take this option:uv=scale\n Expects input vx,vy vector components and uses the scale to convert to polar coordinates with  length in given unit."
},

{
    "location": "color.html#",
    "page": "Setting color",
    "title": "Setting color",
    "category": "page",
    "text": ""
},

{
    "location": "color.html#Setting-color-1",
    "page": "Setting color",
    "title": "Setting color",
    "category": "section",
    "text": "Color can be selected in several different ways. One of the is to create color maps with the makecpt and grd2cpt modules (see their own man pages). This is the method we use to colorize images, sets of points, etc. The other option sets the color via keyword/value pairs and is appropriate to color fill polygons, individual symbols, etc and the one documented here.We may use this in modules that expect the color or fill keywords, then the value can be a string or a symbol with the color\'s name (or names separated by commas); a number in the [0 255] range to indicate a gray shade tone; or a 3-elements tuple (more tricky) or array (simpler) where each element contains the R,G,B component in either [0 255] or [0 1] range.Examples:color=:red                     Single color\ncolor=200                      Single gray\ncolor=\"#aabbcc\"                Single color\ncolor=\"30/20/180\"              Single color\ncolor=\"yellow,brown\"           Two colors\ncolor=(30,180)                 Two gray levels\ncolor=((30,20,180),)           Single color\ncolor=((10,50,99),(20,60,90))  Two colors\ncolor=[0.118 0.078 0.706]      Single color in [0 1]\ncolor=[10 50 99; 20 60 90]     Two colors\ncolor=(:red,:green,:blue)      Three colorsBut there are other options that expect color in one of its elements. For example, to set a text font we may want to choose a color (i.e. not use the default which is black). Then we would do drop the color= and use the value in that other option value. For example font=(12, \"Helvetica\", (30,20,180)), where the color is the third element in the font keyword option. "
},

{
    "location": "decorated.html#",
    "page": "Line decorations",
    "title": "Line decorations",
    "category": "page",
    "text": ""
},

{
    "location": "decorated.html#Line-decorations-1",
    "page": "Line decorations",
    "title": "Line decorations",
    "category": "section",
    "text": "There are two different types of decorated lines. Lines decorated with text (quoted lines) and lines decorated with symbols. This second category is still subdivided in two algorithms. They are all specified by a keyword (decorated) and a named tuple.decorated=(dist=..., symbol=..., pen=..., quoted=true, etc)"
},

{
    "location": "decorated.html#Front-lines-1",
    "page": "Line decorations",
    "title": "Front lines",
    "category": "section",
    "text": "dist=xx or distance=xx\n Distance gap between symbols and symbol size. If xx is a two elements  array or tuple the first element is gap and second the size. However, size may be ommited  (defaulting to 30% of the gap) and in this case xx may be a scalar or a string.\nnumber=xx\n Instead of the above, use this option to set the number of symbols along the front instead,  but in this case xx must be a two elements array or tuple with the number and size.\nleft=true\n Plot symbols on the left side of the front\nright=true\n Plot symbols on the right side of the front\nlen=xx or length=xx\n Length of the vector head. xx may be numeric, a string with the length  and the units attached (as in len=\"2c\") or a tuple with length and units as in len=(2,:centimeters)\npen=pen\n Use an alternate pen. The pen value may contain any of valid ways of specifying pens.\nsymbol= – Specify which symbol to plot:\nsymbol=:box\nsymbol=:circle\nsymbol=:fault\nsymbol=:triangle\nsymbol=:slip  – Left-lateral or right-lateral strike-slip arrows.\nsymbol=:arcuate  – Draws arcuate arrow heads\noffset=xx – Offset the first symbol from the beginning of the front by that amount [0]."
},

{
    "location": "decorated.html#Decorated-lines-1",
    "page": "Line decorations",
    "title": "Decorated lines",
    "category": "section",
    "text": "To select this type the dec2=true keyword/value must be present in the decorated args. The required setting controls the placement of labels along the quoted lines. Choose among the controlling algorithms."
},

{
    "location": "decorated.html#placement_method_dec-1",
    "page": "Line decorations",
    "title": "Placement methods:",
    "category": "section",
    "text": "dist=xx or distance=xx\n Give distances between labels on the plot in your preferred measurement unit. xx may be a scalar or a string. Use strings when appending the units c (cm), i (inch), or p (points).\ndistmap=xx\n Like above but specify distances in map units and append the unit; choose among e (m),  f (foot), k (km), M (mile), n (nautical mile) or u (US survey foot), and d (arc degree), m (arc minute),  or s (arc second)\nline=xx\n Give the coordinates of the end points for one or more straight line segments.  Symbols will be placed where these lines intersect the decorated lines. xx format is a Mx4 array  with the coordinates of the line\'s end points. The format of each line specification is  [startx starty stopx stopy]. These can be replaced by by a 2-character key that uses the justification  format employed in text to indicate a point on the frame or center of the map, given as [LCR][BMT].\nLine=xx\n Like line But will interpret the point pairs as defining great circles.\nn_labels=xx or :n_symbols=xx\n Specifies the number of equidistant labels for quoted lines [1].\nN_labels=xx or :N_symbols=xx\n Same as above but starts labeling exactly at the start of the line  [Default centers them along the line]. Optionally, append /min_dist[c|i|p] to enforce that a minimum distance  separation between successive labels is enforced. In this case xx must obviously be a string."
},

{
    "location": "decorated.html#symb_format_dec-1",
    "page": "Line decorations",
    "title": "Symbol formatting:",
    "category": "section",
    "text": "marker=symb or symbol=symb\n Selects the decorating symbol symb. See the Symbols for the list of symbols available.\nsize=xx or markersize or symbsize or symbolsize\n Use any of these to set the symbol size. Sizes can be scalars, strings or tuples if a unit is used.\nangle=xx\n For symbols at a fixed angle.\ndebug=true\n Turns on debug which will draw helper points and lines to illustrate the workings  of the decorated line setup.\nfill=color\n Sets the symbol fill. The color is a Setting color element.\npen=pen\n Draws the outline of symbols; optionally specify pen for outline [Default is width = 0.25p,  color = black, style = solid]. The pen value may contain any of valid ways of specifying pens.\nnudge=xx\n Nudges the placement of symbols by the specified amount. xx may be a scalar, a 2 elements  array (to separate x and y nudges) or a string. Must use a string if units are used.\nn_data=xx\n Specifies how many (x,y) points will be used to estimate symbol angles [Default is 10]."
},

{
    "location": "decorated.html#Quoted-lines-1",
    "page": "Line decorations",
    "title": "Quoted lines",
    "category": "section",
    "text": "To select this type the quoted=true keyword/value must be present in the decorated args. Lines with annotations such as contours. The required setting controls the placement of labels along the quoted lines. Choose among the controlling algorithms."
},

{
    "location": "decorated.html#placement_method_quot-1",
    "page": "Line decorations",
    "title": "Placement methods:",
    "category": "section",
    "text": "dist=xx or distance=xx\n Give distances between labels on the plot in your preferred measurement unit. xx may be a scalar or a string. Use strings when appending the units c (cm), i (inch), or p (points).\ndistmap=xx\n Similar to above but specify distances in map units and append the unit; choose among e (m),  f (foot), k (km), M (mile), n (nautical mile) or u (US survey foot), and d (arc degree), m (arc minute),  or s (arc second).\nline=xx\n Give the coordinates of the end points for one or more straight line segments.  Symbols will be placed where these lines intersect the quoted lines. xx format is a Mx4 array  with the coordinates of the line\'s end points. The format of each line specification is  [startx starty stopx stopy]. These can be replaced by a 2-character key that uses the justification  format employed in text to indicate a point on the frame or center of the map, given as [LCR][BMT].\nLine=xx\n Like line But will interpret the point pairs as defining great circles.\nn_labels=xx or :n_symbols=xx\n Specifies the number of equidistant labels for quoted lines [1].\nN_labels=xx or :N_symbols=xx\n Same as above but starts labeling exactly at the start of the line  [Default centers them along the line]. Optionally, append /min_dist[c|i|p] to enforce that a minimum distance  separation between successive labels is enforced. In this case xx must obviously be a string."
},

{
    "location": "decorated.html#label_format_quot-1",
    "page": "Line decorations",
    "title": "Label formatting:",
    "category": "section",
    "text": "angle=xx\n For symbols at a fixed angle.\nclearance=xx\n Sets the clearance between label and optional text box. xx may be a scalar, a 2 elements  array (to separate x and y clearances) or a string. Must use a string if units are used. Use % to indicate  a percentage of the label font size [15%].\ncolor=color\n Selects opaque text boxes [Default is transparent]; optionally specify the color [Default is PS_PAGE_COLOR].  The color is a Setting color element.\nconst_label=\"xx\"\n Sets the constant label text.\ncurved=true\n Specifies curved labels following the path [Default is straight labels].\ndebug=true\n Turns on debug which will draw helper points and lines to illustrate the workings  of the decorated line setup.\ndelay=true\n Delay the plotting of the text. This is used to build a clip path based on the text, then lay  down other overlays while that clip path is in effect, then turning of clipping with clip -Cs which  finally plots the original text.\nfont=xx\n Sets the desired font [Default FONTANNOTPRIMARY with its size changed to 9p]. xx is a  Setting fonts element.\njustify=xx\n Sets label justification [Default is MC]. xx is a two char justification code (see Justify).\nlabel=xx\nSets the label text according to the specified option. Where xx may be a symbol or a tuple:\nlabel=:header  – Take the label from the current segment header\nlabel=:input   – Use text after the 2nd column in the fixed label location file as the label.  Requires the fixed label location setting.\nlabel=(:plot_dist,\"unit\")  – Take the Cartesian plot distances along the line as the label.  Use any of c|i|p as the unit.\nlabel=(:map_dist,\"unit\") –  Calculate actual map distances. Use any of d|e|f|k|n|M|n|s as the unit.\nmin_rad=xx\n Do not place labels where the line’s radius of curvature is less than min_rad [Default is 0]. \nnudge=xx\n Nudges the placement of symbols by the specified amount. xx may be a scalar, a 2 elements  array (to separate x and y nudges) or a string. Must use a string if units are used.\nn_data=xx\n Specifies how many (x,y) points will be used to estimate symbol angles [Default is 10].\npen=pen\n Draws the outline of text boxes; optionally specify pen for outline  [Default is width = 0.25p, color = black, style = solid]. The pen value may contain any of valid ways  of specifying pens.\nprefix=xx\n Prepends prefix (xx is a string) to all line labels. If prefix starts with a leading hyphen  (-) then there will be no space between label value and the prefix.\nrounded=true\n Selects rounded rectangular text box [Default is rectangular].\nsuffices=\"first,last\"\n Append the suffices first and last to the corresponding labels. Used to  annotate the start and end of a line [Default just adds a prime to the second label].\nunit=xx\n Appends unit (xx is a string) to all line labels. If unit starts with a leading hyphen (-)  then there will be no space between label value and the unit. [Default is no unit]. "
},

{
    "location": "symbols.html#",
    "page": "Symbols",
    "title": "Symbols",
    "category": "page",
    "text": ""
},

{
    "location": "symbols.html#Symbols-1",
    "page": "Symbols",
    "title": "Symbols",
    "category": "section",
    "text": "Not yet"
},

{
    "location": "arrows.html#",
    "page": "arrows",
    "title": "arrows",
    "category": "page",
    "text": ""
},

{
    "location": "arrows.html#arrows-1",
    "page": "arrows",
    "title": "arrows",
    "category": "section",
    "text": "arrows(cmd0::String=\"\", arg1=nothing; kwargs...)Reads (x,y,a,b) data and make arrow plots. The input can either be a file name of a file with at least four columns, but optionally more, or an Mx2 Array or GMTdatset object with the same characteristics in terms of columns number.This module is a subset of plot to make it simpler to draw arrow plots. So not all (fine) controlling parameters are not listed here. For the finest control, user should consult the plot module."
},

{
    "location": "arrows.html#Parameters-1",
    "page": "arrows",
    "title": "Parameters",
    "category": "section",
    "text": "B or axis or frame\nSet map boundary frame and axes attributes. Default is to draw and annotate left and bottom axes. More at axis\nJ or proj : proj=<parameters>\nSelect map projection. Default is linear and 14 cm width. More at proj\nR or region or limits : – limits=(xmin, xmax, ymin, ymax) | limits=(BB=(xmin, xmax, ymin, ymax),)  | limits=(LLUR=(xmin, xmax, ymin, ymax),units=\"unit\") | ...more \n Specify the region of interest. Default limits are computed from data extents. More at limits\nG or markerfacecolor or MarkerFaceColor or mc or fill\n Select color or pattern for filling of vector heads [Default is no fill]. See Setting color  for extend color selection (including colormap generation).\nW or pen=pen\n Set pen attributes for the arrow stem [Defaults: width = default, color = black,  style = solid]. See Pen attributes\narrow\n Direction (in degrees counter-clockwise from horizontal) and length must be found in columns 3 and 4,  and size, if not specified on the command-line, should be present in column 5. The size is the length of  the vector head. Vector stem width is set by pen. By default, a vector head of 0.5 cm is set but see  Vector Attributes for overwriting this default and specifying other attributes.\nU or stamp : – stamp=true | stamp=(just=\"code\", pos=(dx,dy), label=\"label\", com=true)\n Draw GMT time stamp logo on plot. More at stamp\nV or verbose : – verbose=true | verbose=level\n Select verbosity level. More at verbose\nX or x_off or x_offset : – x_off=[] | x_off=x-shift | x_off=(shift=x-shift, mov=\"a|c|f|r\")\n Shift plot origin. More at x_off\nY or y_off or y_offset : – y_off=[] | y_off=y-shift | y_off=(shift=y-shift, mov=\"a|c|f|r\")\n Shift plot origin. More at y_off"
},

{
    "location": "arrows.html#Examples-1",
    "page": "arrows",
    "title": "Examples",
    "category": "section",
    "text": "Plot a single arrow with head and tail.    arrows([0 8.2 0 6], limits=(-1,4,7,9), arrow=(len=2,start=:arrow,stop=:tail,shape=0.5),\n           proj=:X, figsize=(12,4), axis=:a, pen=\"4p\", show=true)Let us see the effect of the scale factor in quiver plots (components given in u,v). Plot a single vector with length 0f 5 cm. Notice that all, vector magnitude, map limits and map size are equal to 5.   arrows([0.0 0 5 5], limits=(0,5,0,5), proj=:X5, axis=(annot=:a, grid=1),\n          arrow=(len=0.5,stop=1,uv=1), show=true)now, we increase the fig size to 10 cm and because the vector magnitude is half ot it (= 5) we see that the vector is now plot from 0 to 2.5 figure units. In fact, the vector has exactly the same size as in previous example but the figure is now twice as large.   arrows([0.0 0 5 5], limits=(0,5,0,5), proj=:X10, axis=(annot=1, ticks=0.5, grid=1),\n          arrow=(len=0.5,stop=1,uv=1), show=true)and finally we will change the vector size again but this time by applying a factor scale of 0.5. The vector is now 1.25 figure units long.   arrows([0.0 0 5 5], limits=(0,5,0,5), proj=:X10, axis=(annot=0.5, ticks=0.25, grid=0.5),\n          arrow=(len=0.5,stop=1,uv=0.5), show=true)"
},

{
    "location": "bar.html#",
    "page": "bar",
    "title": "bar",
    "category": "page",
    "text": ""
},

{
    "location": "bar.html#bar-1",
    "page": "bar",
    "title": "bar",
    "category": "section",
    "text": "bar(cmd0::String=\"\", arg1=[]; kwargs...)Reads (x,y) pairs and plots a bar graph. This module is a subset of plot to make it simpler to draw bar plots. So not all (fine) controlling parameters are listed here. For a finer control, user should consult the plot module. "
},

{
    "location": "bar.html#Parameters-1",
    "page": "bar",
    "title": "Parameters",
    "category": "section",
    "text": "B or axis or frame\nSet map boundary frame and axes attributes. Default is to draw and annotate left and bottom axes. More at axis\nJ or proj : – proj=<parameters>\nSelect map projection. Default is linear and 14 cm width. More at proj\nR or region or limits : – limits=(xmin, xmax, ymin, ymax) | limits=(BB=(xmin, xmax, ymin, ymax),)  | limits=(LLUR=(xmin, xmax, ymin, ymax),units=\"unit\") | ...more \n Specify the region of interest. Default limits are computed from data extents. More at limits\nG or markerfacecolor or MarkerFaceColor or mc or fill\n Select color or pattern for filling of symbols [Default is no fill]. Note that plot will search for fill  and pen settings in all the segment headers (when passing a GMTdaset or file of a multi-segment dataset)  and let any values thus found over-ride the command line settings (but those must be provided in the terse GMT  syntax). See Setting color for extend color selection (including color map generation).\nbar\n Vertical bar extending from base to y. By default, base is 0 and the bar widths are 0.8 of the width in  x-units. You can change this by using (in alternative):\nwidth=xx\n where xx is the bar width in x-units (bar base remains = 0).\nbase=xx\n where xx is the base value (bar width remains = 0.8).\nbar=??\n where ?? is a string with a full GMT syntax for this option (-Sb)\nbar=(width=xx,unit=xx,base=xx,height=xx)\n Attention, the order of members matters but only width is mandatory.\nwidth\n The bar width in x-units. To specify it in plot units, use the unit member with cm, inch or point.\nunit\n In case width is given in plot units. Valid units are cm, inch or point.\nbase=xx\n where xx is the base value.\nheight\n If the bar height is measured relative to base xx [Default is relative to origin].  Cannot be used together with base.\nhbar\n Horizontal bar extending from base to x. Same as bar but now with respect to y axis, except that one  cannot use width or base to change just those defaults (the use of it is restricted to the vertical  bars case)."
},

{
    "location": "bar.html#Examples-1",
    "page": "bar",
    "title": "Examples",
    "category": "section",
    "text": "A simple bar plot with 10 bars and automatic limits.    bar(rand(10), show=true)"
},

{
    "location": "bar.html#See-also-1",
    "page": "bar",
    "title": "See also",
    "category": "section",
    "text": "The GMT man page"
},

{
    "location": "bar3.html#",
    "page": "bar3",
    "title": "bar3",
    "category": "page",
    "text": ""
},

{
    "location": "bar3.html#bar3-1",
    "page": "bar3",
    "title": "bar3",
    "category": "section",
    "text": "bar3(cmd0::String=\"\", arg1=nothing; kwargs...)Plots a 3D bar graph. The input can either be a file name of a file with at least three columns (x,y,z), but optionally more, a GMTdatset object with also three or more columns. However, the simplest usage is to provide a grid object (a GMTgrid) or a MxN matrix (with M,N > 3) and accept the defaults set for these data types. When not using grids or matrices the width keyword (see below) is mandatory, unless both xsize and ysize are given as two extra data columns. When using file names, however, it is necessary to tell the program if it is going to read a grid or a table. That is achieved by using grd=true or dataset=true, respectively.This module is a subset of plot to make it simpler to draw 3D bar plots. So not all (fine) controlling parameters are listed here. For a finer control, user should consult the plot module."
},

{
    "location": "bar3.html#Parameters-1",
    "page": "bar3",
    "title": "Parameters",
    "category": "section",
    "text": "B or axis or frame\nSet map boundary frame and axes attributes. Default is to draw and annotate left, bottom and vertical axes and just draw left and tp axes. More at axis\nJ or proj : proj=<parameters>\nSelect map projection. Default is linear and 12 cm width. More at proj\nR or region or limits : – limits=(xmin, xmax, ymin, ymax, zmin, zmax) | limits=(BB=(xmin, xmax, ymin, ymax, zmin, zmax),)  | ...more\n Specify the region of interest. Default limits are computed from data extents. More at limits\nG or markerfacecolor or MarkerFaceColor or mc or fill\n Select color or pattern for filling of bars [Default is default color]. See Setting color for extend  color selection (including color map generation).\nbar\n column (3-D) extending from base to z. By default, base is 0 and the bar widths are 0.85 of the width in  x-units. You can change this by using (in alternative):\nwidth=xx\n where xx is the bar width in x-units (bar base remains = 0).\nbase=xx\n where xx is the base value (bar width remains = 0.85).\nbar=??\n where ?? is a string with a full GMT syntax for this option (-Sb)\nbar=(width=xx,unit=xx,base=xx,height=xx)\n Full featured option. Attention, the order of members matters. unit must always come after width,  but otherwise they are all optional.\nwidth\n The bar width in x-units. To specify it in plot units, use the unit member with cm, inch or point.\nunit\n In case width is given in plot units. Valid units are cm,inchorpoint`.\nbase=xx\n where xx is the base value.\nheight\n If the bar height is measured relative to base xx [Default is relative to origin].  Cannot be used together with base.\nThe facet colors will be modified to simulate shading. Use noshade=true to disable such 3-D illumination.  Normally a single z value is considered. For multi-band columns, use nbands=n (and provide n z-values  on input; these must be monotonically increasing up the column) or Nbands=n (and expect n of dz  increments that must be summed to yield actual z values). The multi-band column symbol requires a  fill=cmap (i.e. the use of a colormap) and will use the band number (0, 1, nbands-1) to assign the band  color. The way to use these options is also as a separate keyword, or as an extra member of the bar tuple.\nnbands=n or Nbands=n\nor\nbar=(width=xx,unit=xx,base=xx,height=xx,nbands=xx)  (or Nbands=xx for last element)\np or view\n Default is viewpoint from an azimuth of 200 and elevation of 30 degrees.\n Specify the viewpoint in terms of azimuth and elevation. The azimuth is the horizontal rotation about the z-axis as measured in degrees from the positive y-axis. That is, from North. This option is not yet fully  expanded. Current alternatives are:\nview=??\n A full GMT compact string with the full set of options.\nview=(azim,elev)\n A two elements tuple with azimuth and elevation\nview=true\n To propagate the viewpoint used in a previous module (makes sense only in bar3)"
},

{
    "location": "bar3.html#Examples-1",
    "page": "bar3",
    "title": "Examples",
    "category": "section",
    "text": "View a grid as a 3D bar plotG = gmt(\"grdmath -R-15/15/-15/15 -I0.5 X Y HYPOT DUP 2 MUL PI MUL 8 DIV COS EXCH NEG 10 DIV EXP MUL =\");\ncmap = grd2cpt(G);      # Compute a colormap with the grid\'s data range\nbar3(G, lw=:thinnest, color=cmap, fmt=:png, show=true)"
},

{
    "location": "bar3.html#See-also-1",
    "page": "bar3",
    "title": "See also",
    "category": "section",
    "text": "The GMT man page"
},

{
    "location": "coast.html#",
    "page": "coast",
    "title": "coast",
    "category": "page",
    "text": ""
},

{
    "location": "coast.html#coast-1",
    "page": "coast",
    "title": "coast",
    "category": "section",
    "text": "coast(cmd0::String=\"\"; kwargs...)Plot continents, shorelines, rivers, and borders on maps"
},

{
    "location": "coast.html#Description-1",
    "page": "coast",
    "title": "Description",
    "category": "section",
    "text": "Plots grayshaded, colored, or textured land-masses [or water-masses] on maps and [optionally] draws coastlines, rivers, and political boundaries. Alternatively, it can (1) issue clip paths that will contain all land or all water areas, or (2) dump the data to an ASCII table. The data files come in 5 different resolutions: (f)ull, (h)igh, (i)ntermediate, (l)ow, and (c)rude. The full resolution files amount to more than 55 Mb of data and provide great detail; for maps of larger geographical extent it is more economical to use one of the other resolutions. If the user selects to paint the land-areas and does not specify fill of water-areas then the latter will be transparent (i.e., earlier graphics drawn in those areas will not be overwritten). Likewise, if the water-areas are painted and no land fill is set then the land-areas will be transparent. A map projection must be supplied."
},

{
    "location": "coast.html#Required-Arguments-1",
    "page": "coast",
    "title": "Required Arguments",
    "category": "section",
    "text": "J or proj – proj=<parameters>\n Select map projection. More at proj\nR or region or limits – limits=(xmin, xmax, ymin, ymax) | limits=(BB=(xmin, xmax, ymin, ymax),)  | limits=(LLUR=(xmin, xmax, ymin, ymax),units=\"unit\") | ...more   Specify the region of interest. More at limits"
},

{
    "location": "coast.html#Optional-Arguments-1",
    "page": "coast",
    "title": "Optional Arguments",
    "category": "section",
    "text": "-A or area : – area=(min_area[,min_level,max_level]), river-lake=true, lake=true, antarctica_ground=true, skip60S=true, skipN60S=true, percent=pct)\n Features with an area smaller than min_area in km^2 or of hierarchical level that is lower than min_level or higher than max_level will not be plotted [Default is 0/0/4 (all features)]. Level 2 (lakes) contains regular lakes and wide river bodies which we normally include as lakes; use river_lake=true to just get river-lakes or lake=true to just get regular lakes. By default we select the ice shelf boundary as the coastline for Antarctica; use antarctica_ground=true to instead select the ice grounding line as coastline. For expert users who wish to print their own Antarctica coastline and islands via plot you can use skip60S=true to skip all GSHHG features below 60S or skipN60S=true to instead skip all features north of 60S. Finally, append percent=pct to exclude polygons whose percentage area of the corresponding full-resolution feature is less than pct.\nB or axis or frame\n Set map boundary frame and axes attributes. More at axis\nC or river_fill : – river_fill=fill | riverfill=(lake=true, riverlakes=true, fill)\n Set the shade, color, or pattern for lakes and river-lakes [Default is the fill chosen for \"wet\" areas (water)]. Optionally, specify separate fills by using river_fill=(lake=true, fill) for lakes and riverfill=(riverlakes=true, fill) for river-lakes. To repeate the river_fill option use a tuple of tuples.\nclip : – clip=:land |  clip=:water|ocean |  clip=:end\n clip=:land or clip=:water|ocean starts a clipping path. clip=:end marks end of existing clip path.  No projection information is needed. Also supply X and Y settings if you have moved since the  clip started.\nD or res or resolution : – res=full | res=auto\n Selects the resolution of the data set to use full, high, intermediate, low, and crude. The resolution drops off by 80% between data sets. The default is res=auto, which chooses to automatically select the best resolution given the chosen map scale.\nE or DCW : – DCW=code1,code2,... | DCW=(country=code, continent=code, pen=pen, fill=fill)\n Select painting country polygons from the Digital Chart of the World. This is another dataset independent of GSHHG and hence the area and resolution options do not apply. DCW=\"+l\" just list the countries and their codes [plotting takes place] and DCW=\"+L\" shows states/territories for Argentina, Australia, Brazil, Canada, and the US. country or name=code(s), where code(s) is a one or more comma-separated countries using the 2-character ISO 3166-1 alpha-2 convention. To select a state of a country (if available), append .state, e.g, US.TX for Texas. To specify a whole continent, use continent=code, with continent codes AF (Africa),AN (Antarctica), AS (Asia), EU (Europe), OC (Oceania), NA (North America), or SA (South America). Use pen=pen (see Pen attributes) to draw polygon outlines and fill=fill (see Fill color/pattern) to fill them [default is no fill]. At least one of these must be specified unless dump is in effect, in which case only one DCW option can be given. It is also possible to specify the parameters using simple Tuples. For example: DCW=(\"PT\", (0.5,\"red\",\"–\"), \"blue\") plots the polygon PT with a 0.5p red dashed line and filled with blue. You may repeat DCW to give different groups of items their own pen/fill settings. However, since we cannot repeat a keyword, the solution to setting different groupes is to use a tuple of tuples. An example would be DCW=((country=:PT, pen=(2,:red), fill=:blue), (country=:ES, pen=(2,:blue)) ). If neither proj nor dump are set then we just print the region.\nF or box : – box=(clearance=gap, pen=pen, fill=fill, inner=(gap,pen), rounded=xx, shaded=(dx,dy[,shade]))\n Without further options, draws a rectangular border around the map scale or rose using MAP_FRAME_PEN; specify a different pen with pen=new_pen. Add fill=fill_value to fill the logo box [no fill]. Append clearance=gap where gap is either ascalar, or tuples with (xgap, ygap), or (lgap,rgap,bgap,tgap) where these items are uniform, separate in x- and y-direction, or individual side spacings between logo and border. Append inner to draw a secondary, inner border as well. We use a uniform gap between borders of 2p and the MAP_DEFAULT_PEN unless other values are specified. Append rounded=6 to draw rounded rectangular borders instead, with a 6p corner radius. You can override this radius by appending another value. Finally, append shaded=(dx,dy[,shade]) to draw an offset background shaded region. Here, dx,dy indicates the shift relative to the foreground frame [4p,4p] and shade sets the fill style to use for shading [gray50]. Requires map_scale or rose.  If both map_scale or rose, you may repeat box after each of these but remember to put repeated settings inside a tuple of tuples.\nG or land : – land=fill\n Select filling (see Fill color/pattern) \"dry\" areas. Append the shade, color, or pattern.\nI or rivers : – rivers=type | rivers=(type=type, pen=(pen))\n Draw rivers. Specify the type of rivers and [optionally] append pen attributes [Default pen: width = default, color = black, style = solid].\n Choose type from the list of river types below; To repeat this option, use a tuple of tuples.\n0 = Double-lined rivers (river-lakes)\n1 = Permanent major rivers\n2 = Additional major rivers\n3 = Additional rivers\n4 = Minor rivers\n5 = Intermittent rivers - major\n6 = Intermittent rivers - additional\n7 = Intermittent rivers - minor\n8 = Major canals\n9 = Minor canals\n10 = Irrigation canals\n\nYou can also choose from several preconfigured river groups:\n\na = All rivers and canals (0-10)\nA = All rivers and canals except river-lakes (1-10)\nr = All permanent rivers (0-4)\nR = All permanent rivers except river-lakes (1-4)\ni = All intermittent rivers (5-7)\nc = All canals (8-10)\nJz or JZ or zscale or zsize : – zscale=scale | zsize=size\n Set z-axis scaling or or z-axis size. zsize=size sets the size to the fixed value size  (for example zsize=10 or zsize=4i). zscale=scale sets the vertical scale to UNIT/z-unit.\nL or map_scale : – mapscale=([map=true, inside=true, norm=true, paper=true,] anchor=refpoint, scaleat_lat=lat, length=len [,align=side, justify=code, fancy=true, label=lab, offset=(dx,dy), units=unit, vertical=true])\n Draws a simple map scale centered on the reference point specified using one of four coordinate systems: (1) Use map=true for map (user) coordinates, (2) use inner=code for setting refpoint via a 2-char justification code that refers to the (invisible) map domain rectangle, (3) use norm=true for normalized (0-1) coordinates, or (4) use paper=true for plot coordinates (inches, cm, etc.). Scale is calculated for latitude slat (optionally supply longitude slon for oblique projections [Default is central meridian]), length=len when len is in km, or append unit from e or f or k or M ot n or u. Change the label alignment with align=:left|:right|:top|:bottom. Use fancy=true to get a \"fancy\" scale [Default is plain]. By default, the anchor point on the map scale is assumed to be the center of the scale (MC), but this can be changed by adding justify=code, where code is a 2-char justification code (see text for list and explanation of codes). label=lab selects the default label, which equals the distance unit (meter, foot, km, mile, nautical mile, US survey foot) and is justified on top of the scale. Change this by giving your own label lab. Add offset=(dx,dy) to offset the map scale by dx,dy away from the anchor in the direction implied by justify. Select units=unit to append the unit to all distance annotations along the scale (for the plain scale, this will instead select the unit to be appended to the distance length). Cartesian projections: Origin scaleatlat is not required, fancy is not allowed, and no units should be specified in length. You must set any Cartesian data units via label. For a vertical rather than horizontal Cartesian scale, append vertical=true. Note: Use FONT_LABEL to change the label font and FONT_ANNOT_PRIMARY to change the annotation font. The height of the map scale is controlled by MAP_SCALE_HEIGHT, and the pen thickness is set by MAP_TICK_PEN_PRIMARY. See box on how to place a panel behind the scale.\nM or dump : – dump=true\n Dumps a single multisegment ASCII (or binary, see -bo) file to standard output. No plotting occurs. Specify one of DCW, rivers, borders or shore. Note: if dump is used with DCW then region or the +r modifier to DCW are not required as we automatically determine the region given the selected geographic entities.\nN  or borders : – borders=type | borders=(type=type, pen=(pen))\n Draw political boundaries. Specify the type of boundary and [optionally] append pen attributes [Default pen: width = default, color = black, style = solid].\n Choose type from the list of boundaries below. To repeat this option, use a tuple of tuples.\n1 = National boundaries\n2 = State boundaries within the Americas\n3 = Marine boundaries\na = All boundaries (1-3)\nS or water or ocean : – water=fill\n Select filling of \"wet\" areas. Append the shade, color, or pattern;  [Default is no fill].\nTd or rose : – rose=([map=true, inside=true, norm=true, paper=true,] anchor=refpoint, width=width [,justify=code, fancy=level, labels=labels, offset=(dx,dy)])\n Draws a map directional rose on the map at the location defined by the reference and anchor points: Give the reference point on the map for the rose using one of four coordinate systems: (1) Use map=true for map (user) coordinates, (2) use inside=code for setting refpoint via a 2-char justification code that refers to the (invisible) map domain rectangle, (3) use norm=true for normalized (0-1) coordinates, or (4) use paper=true for plot coordinates (inches, cm, etc.). You can offset the reference point with offset=(dx,dy) in the direction implied by justify=code. By default, the anchor point is assumed to be the center of the rose (MC), but this can be changed by using justify=code where code is a 2-char justification code (see text for list and explanation of codes). Note: If -Dj is used then justify defaults to the same as refpoint, if -DJ is used then justify defaults to the mirror opposite of refpoint. Use width=width to set the width of the rose in plot coordinates (in inches, cm, or points). Add fancy=true to get a \"fancy\" rose, and specify in level what you want drawn. The default [1 or true] draws the two principal E-W, N-S orientations, 2 adds the two intermediate NW-SE and NE-SW orientations, while 3 adds the eight minor orientations WNW-ESE, NNW-SSE, NNE-SSW, and ENE-WSW. Label the cardinal points W,E,S,N by adding labels and append your own four comma-separated string to override the default. Skip a specific label by leaving it blank. See Placing-dir-map-roses and box on how to place a panel behind the scale.\nTm or compass : – compass=([map=true, inside=true, norm=true, paper=true,] anchor=refpoint, width=width, [dec=(dec, dlabel), justify=code, labels=labels, roseprimary=pen, rosesecondary=pen, offset=(dx,dy)])\n Draws a map magnetic rose on the map at the location defined by the reference and anchor points: Give the reference point on the map for the rose using one of four coordinate systems: (1) Use *map=true for map (user) coordinates, (2) use inner=code for setting refpoint via a 2-char justification code that refers to the (invisible) map domain rectangle, (3) use norm=true for normalized (0-1) coordinates, or (4) use paper=true for plot coordinates (inches, cm, etc.). You can offset the reference point with offset=(dx,dy) in the direction implied by justify=code. By default, the anchor point is assumed to be the center of the rose (MC), but this can be changed by using justify=code where code is a 2-char justification code (see text for list and explanation of codes). Note: If -Dj is used then justify defaults to the same as refpoint, if -DJ is used then justify defaults to the mirror opposite of refpoint. Use width=width to set the width of the rose in plot coordinates (in inches, cm, or points). Use dec=dec to assign the magnetic declination or dec=(dec, dlabel) to set *dlabel, which is a label for the magnetic compass needle (use \"-\" as dlabel to bypass labeling). With dec, both directions to geographic and magnetic north are plotted [Default is geographic only]. If the north label is a star (***) as in dec=(1,\"W,E,S.\")* then a north star is plotted instead of the north label. Annotation and two levels of tick intervals for both geographic and magnetic directions default to 30/5/1 degrees; override these settings by appending annot=(...,...,.), and enter six intervals to set both the geographic (first three) and magnetic (last three) intervals. Label the cardinal points W,E,S,N by adding label=lab where lab is your own four comma-separated string to override the default. Skip a specific label by leaving it blank. The rose_primary=pen and rose_secondary=pen modify the pens used to plot the outter and inner circles of the comapss. A number GMT default parameters control pens, fonts, and color. See Placing-dir-map-roses and **box on how to place a panel behind the scale.\nU or stamp : – stamp=true | stamp=(just=\"code\", pos=(dx,dy), label=\"label\", com=true)\n Draw GMT time stamp logo on plot. More at stamp\nV or verbose : – verbose=true | verbose=level\n Select verbosity level. More at verbose\nW  or shore : – shore=pen | shore=(level, pen)\n Draw shorelines [the Default]. Append pen attributes (see Pen attributes) [Defaults: width = default, color = black,style = solid] which apply to all four levels. To set the pen for each level differently, use the form shore=(level, pen), where level is 1-4 and represent coastline, lakeshore, island-in-lake shore, and lake-in-island-in-lake shore. To repeat the shore option, use a tuple of tuples. When specific level pens are set, those not listed will not be drawn [Default draws all levels; but see area].\nX or x_off or x_offset : – xoff=[] | *xoff=x-shift | x_off=(shift=x-shift, mov=\"a|c|f|r\")\n Shift plot origin. More at x_off\nY or y_off or y_offset : – yoff=[] | *yoff=y-shift | y_off=(shift=y-shift, mov=\"a|c|f|r\")\n Shift plot origin. More at y_off\np or view or perspective : – view=(azim, elev)\n Selects perspective view and sets the azimuth and elevation of the viewpoint. More at perspective\nt or transparency or alpha: – alpha=50\n Set PDF transparency level for an overlay, in (0-100] percent range. [Default is 0, i.e., opaque].  Works only for the PDF and PNG formats."
},

{
    "location": "coast.html#Examples-1",
    "page": "coast",
    "title": "Examples",
    "category": "section",
    "text": "To plot Great Britain, Italy, and France in blue with a red outline and Spain, Portugal and Greece in yellow (no outline), and pick up the plot domain form the extents of these countries, use:    coast(proj=:Mercator, DCW=((country=\"GB,IT,FR\", fill=:blue, pen=(0.25,:red)),\n                               (country=\"ES,PT,GR\", fill=:yellow)), show=true)"
},

{
    "location": "grdcontour.html#",
    "page": "grdcontour",
    "title": "grdcontour",
    "category": "page",
    "text": ""
},

{
    "location": "grdcontour.html#grdcontour-1",
    "page": "grdcontour",
    "title": "grdcontour",
    "category": "section",
    "text": "grdcontour(cmd0::String=\"\", arg1=nothing; kwargs...)Make contour map using a grid.Read a 2-D grid and produces a contour map by tracing each contour through the grid. Various options that affect the plotting are available. Alternatively, the x, y, z positions of the contour lines may be saved to one or more output files (or memory) and no plot is produced."
},

{
    "location": "grdcontour.html#Required-Arguments-1",
    "page": "grdcontour",
    "title": "Required Arguments",
    "category": "section",
    "text": "The 2-D gridded data set to be contoured.J or proj : – proj=<parameters>\n Select map projection. More at proj"
},

{
    "location": "grdcontour.html#Optional-Arguments-1",
    "page": "grdcontour",
    "title": "Optional Arguments",
    "category": "section",
    "text": "A or annot : – annot=annot_int | annot=(int=annot_int, disable=true, single=true, labels=labelinfo)\nannot_int is annotation interval in data units; it is ignored if contour levels are given in a file. [Default is no annotations]. Use annot=(disable=true,) to disable all annotations implied by cont. Alternatively do annot=(single=true, int=val) to plot val as a single contour. The optional labelinfo controls the specifics of the label formatting and consists of a named tuple with the following control arguments Label formatting\nB or axis or frame\nSet map boundary frame and axes attributes. More at axis\nC or cont or contours or levels : – cont=cont_int\nThe contours to be drawn may be specified in one of three possible ways:\nIf cont_int has the suffix \".cpt\" and can be opened as a file, it is assumed to be a CPT. The color boundaries are then used as contour levels. If the CPT has annotation flags in the last column then those contours will be annotated. By default all contours are labeled; use annot=(disable=true,)) (or annot=\"-\") to disable all annotations.\nIf cont_int is a file but not a CPT, it is expected to contain contour levels in column 1 and a C(ontour) OR A(nnotate) in col 2. The levels marked C (or c) are contoured, the levels marked A (or a) are contoured and annotated. Optionally, a third column maybe present and contain the fixed annotation angle for this contour level.\nIf no file is found, then cont_int is interpreted as a constant contour interval. However, if prepended with the + sign (hence it has to be a string) the cont_int is taken as meaning draw that single contour. The annot option offers the same possibility so they may be used together to plot a single annotated contour and another single non-annotated contour, as in anot=\"+10\", cont=\"+5\" that plots an annotated 10 contour and an non-annotated 5 contour. If annot is set and cont is not, then the contour interval is set equal to the specified annotation interval. Note to specify a negative value you must still prepend the +, as in cont=\"+-10\".\nIf a file is given and ticks is set, then only contours marked with upper case C or A will have tick-marks. In all cases the contour values have the same units as the grid. Finally, if neither cont nor annot are set then we auto-compute suitable contour and annotation intervals from the data range, yielding 10-20 contours.\nD or dump : – dump=fname\nDump contours as data line segments; no plotting takes place. Append filename template which may contain C-format specifiers. If no filename template is given we write all lines to stdout. If filename has no specifiers then we write all lines to a single file. If a float format (e.g., %6.2f) is found we substitute the contour z-value. If an integer format (e.g., %06d) is found we substitute a running segment count. If an char format (%c) is found we substitute C or O for closed and open contours. The 1-3 specifiers may be combined and appear in any order to produce the the desired number of output files (e.g., just %c gives two files, just %f would separate segments into one file per contour level, and %d would write all segments to individual files; see manual page for more examples.\n-F or force : – force=true | force=:left | force=:right\nForce dumped contours to be oriented so that higher z-values are to the left (force=:left) or right (force=:right) as we move along the contour [Default is arbitrary orientation]. Requires dump.\nG or labels : – labels=()\nThe required argument controls the placement of labels along the quoted lines. Choose among five controlling algorithms as explained in Placement methods\nL or range : – range=(low,high) | range=:n|:p|:N|:P\nLimit range: Do not draw contours for data values below low or above high.  Alternatively, limit contours to negative (range=:n) or positive (range=:p) contours. Use upper case N or P to include the zero contour.\nN or fill : – fill=color\nFill the area between contours using the discrete color table given by color, a Setting color element. Then, cont and annot can be used as well to control the contour lines and annotations. If no color is set (fill=[]) then a discrete color setting must be given via cont instead.\nQ or cut : – cut=np | cut=length&unit[+z]\nDo not draw contours with less than np number of points [Draw all contours]. Alternatively, give instead a minimum contour length in distance units, including c (Cartesian distances using user coordinates) or C for plot length units in current plot units after projecting the coordinates. Optionally, append +z to exclude the zero contour.\nR or region or limits : – limits=(xmin, xmax, ymin, ymax) | limits=(BB=(xmin, xmax, ymin, ymax),)  | limits=(LLUR=(xmin, xmax, ymin, ymax),units=\"unit\") | ...more   Specify the region of interest. More at limits\nS or smooth : smooth=smoothfactor\nUsed to resample the contour lines at roughly every (gridbox_size/smoothfactor) interval.\nT or ticks : – ticks=(localhigh=true, locallow=true, gap=gap, closed=true, labels=labels)\nWill draw tick marks pointing in the downward direction every gap along the innermost closed contours only; set closed=true to tick all closed contours. Use gap=(gap,length) and optionally tick mark length (append units as c, i, or p) or use defaults [\"15p/3p\"]. User may choose to tick only local highs or local lows by specifying local_high=true, local_low=true, respectively. Set labels to annotate the centers of closed innermost contours (i.e., the local lows and highs). If no labels (i.e, set labels=\"\") is set, we use - and + as the labels. Appending exactly two characters, e.g., labels=:LH, will plot the two characters (here, L and H) as labels. For more elaborate labels, separate the low and hight label strings with a comma (e.g., labels=\"lo,hi\"). If a file is given by cont, and ticks is set, then only contours marked with upper case C or A will have tick marks [and annotations]. \nW or pen : – pen=(annot=true, contour=true, pen=pen, colored=true, cline=true, ctext=true)\nannot=true if present, means to annotate contours or contour=true for regular contours [Default]. The pen sets the attributes for the particular line. Default pen for annotated contours: pen=(075black). Regular contours use pen=(025black). Normally, all contours are drawn with a fixed color determined by the pen setting. This option may be repeated, for example to separate contour and annotated contours settings. For that the syntax changes to use a Tuple of NamedTuples, e.g.  pen=((annot=true contour=true pen=pen) (annot=true contour=true pen=pen)). If the modifier pen=(cline=true) is used then the color of the contour lines are taken from the CPT (see cont). If instead pen=(ctext=true) is appended then the color from the cpt file is applied to the contour annotations. Select pen=(colored=true) for both effects.\nZ or scale : – scale=factor | scale=(factor=factor, shift=shift, periodic=true)\nUse to subtract shift from the data and multiply the results by factor before contouring starts. (Numbers in annot, cont, range refer to values after this scaling has occurred.) Use periodic=true to indicate that this grid file contains z-values that are periodic in 360 degrees (e.g., phase data, angular distributions) and that special precautions must be taken when determining 0-contours.\nU or stamp : – stamp=true | stamp=(just=\"code\", pos=(dx,dy), label=\"label\", com=true)\n Draw GMT time stamp logo on plot. More at stamp\nV or verbose : – verbose=true | verbose=level\n Select verbosity level. More at verbose\nW or pen : pen=pen\n Set pen attributes for lines or the outline of symbols [Defaults: width = default, color = black, style = solid].\nX or x_off or x_offset : – x_off=[] | x_off=x-shift | x_off=(shift=x-shift, mov=\"a|c|f|r\")\n Shift plot origin. More at x_off\nY or y_off or y_offset : – y_off=[] | y_off=y-shift | y_off=(shift=y-shift, mov=\"a|c|f|r\")\n Shift plot origin. More at y_off"
},

{
    "location": "grdcontour.html#Examples-1",
    "page": "grdcontour",
    "title": "Examples",
    "category": "section",
    "text": "Contour the peaks function. cont=1 and annot=2 means draw contours at every 1 unit of the G grid and annotate at every other contour line:    G = GMT.peaks();\n    grdcontour(G, cont=1, annot=2, fmt=:png, show=true)For a more elaborated example see Contour maps"
},

{
    "location": "grdcontour.html#See-also-1",
    "page": "grdcontour",
    "title": "See also",
    "category": "section",
    "text": "The GMT man page"
},

{
    "location": "grdimage.html#",
    "page": "grdimage",
    "title": "grdimage",
    "category": "page",
    "text": ""
},

{
    "location": "grdimage.html#grdimage-1",
    "page": "grdimage",
    "title": "grdimage",
    "category": "section",
    "text": "grdimage(cmd0::String=\"\"; kwargs...)Project grids or images and plot them on maps"
},

{
    "location": "grdimage.html#Description-1",
    "page": "grdimage",
    "title": "Description",
    "category": "section",
    "text": "Reads one 2-D grid and produces a gray-shaded (or colored) map by plotting rectangles centered on each grid node and assigning them a gray-shade (or color) based on the z-value. Alternatively, grdimage reads three 2-D grid files with the red, green, and blue components directly (all must be in the 0-255 range). Optionally, illumination may be added by providing a file with intensities in the (-1,+1) range or instructions to derive intensities from the input data grid. Values outside this range will be clipped. Such intensity files can be created from the grid using grdgradient and, optionally, modified by grdhisteq. A third alternative is available when GMT is build with GDAL support. Pass img which can be an image file (geo-referenced or not). In this case the images can optionally be illuminated with the file provided via the shade option. Here, if image has no coordinates then those of the intensity file will be used.When using map projections, the grid is first resampled on a new rectangular grid with the same dimensions. Higher resolution images can be obtained by using the -E option. To obtain the resampled value (and hence shade or color) of each map pixel, its location is inversely projected back onto the input grid after which a value is interpolated between the surrounding input grid values. By default bi-cubic interpolation is used. Aliasing is avoided by also forward projecting the input grid nodes. If two or more nodes are projected onto the same pixel, their average will dominate in the calculation of the pixel value. Interpolation and aliasing is controlled with the -n option.The region option can be used to select a map region larger or smaller than that implied by the extent of the grid. "
},

{
    "location": "grdimage.html#Required-Arguments-1",
    "page": "grdimage",
    "title": "Required Arguments",
    "category": "section",
    "text": "J or proj : proj=<parameters>\n Select map projection. More at proj"
},

{
    "location": "grdimage.html#Optional-Arguments-1",
    "page": "grdimage",
    "title": "Optional Arguments",
    "category": "section",
    "text": "-A or img_out or image_out : img_out=fname\n Save an image in a raster format instead of PostScript. Use extension .ppm for a Portable Pixel Map format.  For GDAL-aware versions there are more choices: Use fname to select the image file name and extension.  If the extension is one of .bmp, .gif, .jpg, .png, or .tif then no driver information is required. For other  output formats you must append the required GDAL driver. The driver is the driver code name used by GDAL;  see your GDAL installation\'s documentation for available drivers. Append a +c<options> string where options  is a list of one or more concatenated number of GDAL -co options. For example, to write a GeoPDF with the  TerraGo format use \"=PDF+cGEOENCODING=OGCBP\". Notes: (1) If a tiff file (.tif) is selected then we will  write a GeoTiff image if the GMT projection syntax translates into a PROJ4 syntax, otherwise a plain tiff  file is produced. (2) Any vector elements will be lost.\nB or axis or frame\n Set map boundary frame and axes attributes. More at axis\nC or color or cmap : color=cpt\n Where cpt is a GMTcpt type or a cpt file name (for grd_z only). Alternatively, supply the name of  a GMT color master dynamic CPT [jet] to automatically determine a continuous CPT from the grid\'s z-range;  you may round up/down the z-range by adding +i zinc. Yet another option is to specify  color=\"color1,color2 [,color3 ,...]\" or *color=((r1,g1,b1),(r2,g2,b2),...) to build a linear continuous  CPT from those colors automatically. In this case color1 etc can be a (r,g,b) triplet, a color name, or  an HTML hexadecimal color (e.g. #aabbcc ) (see Setting color). When not explicitly set, but a  color map is needed, we will either use the current color map, if available (set by a previous call to  makecpt), or the default jet color map.\ncoast : coast=true | coast=(...)\n Call the coast module to overlay coastlines and/or countries. The short form coast=true just  plots the coastlines with a black, 0.5p thickness line. To access all options available in the coast  module passe them in the named tuple (...).\ncolorbar : colorbar=true | colorbar=(...)\n Call the colorbar module to add a colorbar. The short form colorbar=true automatically adds a  color bar on the right side of the image using the current color map stored in the global scope. To  access all options available in the colorbar module passe them in the named tuple (...).\nD or img_in or image_in : img_in=true | img_in=:r\n GMT will automatically detect standard image files (Geotiff, TIFF, JPG, PNG, GIF, etc.) and will read  those via GDAL. For very obscure image formats you may need to explicitly set img_in, which specifies  that the grid is in fact an image file to be read via GDAL. Use img_in=:r to assign the region specified  by region to the image. For example, if you have used **region***=global* then the image will be assigned  a global domain. This mode allows you to project a raw image (an image without referencing coordinates).\nE or dpi : dpi=xx | dpi=:i\n Sets the resolution of the projected grid that will be created if a map projection other than Linear or  Mercator was selected [100]. By default, the projected grid will be of the same size (rows and columns)  as the input file. Specify dpi=:i to use the PostScript image operator to interpolate the image at the  device resolution.\nG : G=\"+b\" | G=\"+f\"\n This option only applies when a resulting 1-bit image otherwise would consist of only two colors: black (0)  and white (255). If so, this option will instead use the image as a transparent mask and paint the mask with  the given color. Use G=\"+b\" to paint the background pixels (1) or G=\"+f\" for the foreground pixels  [Default].\nI or shade or intensity : shade=grid | shade=azim | shade=(azimuth=az, norm=params, auto=true)\n Gives the name of a grid with intensities in the (-1,+1) range, or a constant intensity to apply everywhere  (affects the ambient light). Alternatively, derive an intensity grid from the input data grid grd_z via a  call to grdgradient; use shade=(azimuth=az) or shade=(azimuth=az norm=params) to specify azimuth  and intensity arguments for that module or just give shade=(auto=true) to select the default arguments  (azim=-45,nom=:t1). If you want a more specific intensity scenario then run grdgradient` separately first.\nJz or JZ or zscale or zsize : zscale=scale | zsize=size\n Set z-axis scaling or or z-axis size. zsize=size sets the size to the fixed value size  (for example zsize=10 or zsize=4i). zscale=scale sets the vertical scale to UNIT/z-unit.\nM or monochrome : monochrome=true\n  Force conversion to monochrome image using the (television) YIQ transformation. Cannot be used with nan_alpha.\nN or noclip : noclip=true\n  Do not clip the image at the map boundary (only relevant for non-rectangular maps).\nQ or nan_t or nan_alpha : nan_alpha=true\n  Make grid nodes with z = NaN transparent, using the color-masking feature in PostScript Level 3   (the PS device must support PS Level 3).\nR or region or limits : limits=(xmin, xmax, ymin, ymax) | limits=(BB=(xmin, xmax, ymin, ymax),)  | limits=(LLUR=(xmin, xmax, ymin, ymax),units=\"unit\") | ...more   Specify the region of interest. More at limits\nU or stamp : stamp=true | stamp=(just=\"code\", pos=(dx,dy), label=\"label\", com=true)\n Draw GMT time stamp logo on plot. More at stamp\nV or verbose : verbose=true | verbose=level\n Select verbosity level. More at verbose\nX or x_off or x_offset : xoff=[] | *xoff=x-shift | x_off=(shift=x-shift, mov=\"a|c|f|r\")\n Shift plot origin. More at x_off\nY or y_off or y_offset : yoff=[] | *yoff=y-shift | y_off=(shift=y-shift, mov=\"a|c|f|r\")\n Shift plot origin. More at y_off\nn or interp or interpol : interp=params\n Select interpolation mode for grids. More at interp\np or view or perspective : view=(azim, elev)\n Selects perspective view and sets the azimuth and elevation of the viewpoint. More at perspective\nt or transparency or alpha: alpha=50\n Set PDF transparency level for an overlay, in (0-100] percent range. [Default is 0, i.e., opaque].  Works only for the PDF and PNG formats."
},

{
    "location": "grdimage.html#Examples-1",
    "page": "grdimage",
    "title": "Examples",
    "category": "section",
    "text": "To make a map of the global bathymetry (automatically download it if needed) using the Winkel projection, add coast lines and a color bar, do:    grdimage(\"@earth_relief_20m.grd\", proj=:Winkel, colorbar=true,\n             coast=true, show=true)"
},

{
    "location": "grdview.html#",
    "page": "grdview",
    "title": "grdview",
    "category": "page",
    "text": ""
},

{
    "location": "grdview.html#grdview-1",
    "page": "grdview",
    "title": "grdview",
    "category": "section",
    "text": "grdview(cmd0::String=\"\"; kwargs...)Create 3-D perspective image or surface mesh from a grid"
},

{
    "location": "grdview.html#Description-1",
    "page": "grdview",
    "title": "Description",
    "category": "section",
    "text": "Reads a 2-D grid and produces a a 3-D perspective plot by drawing a mesh, painting a colored/grayshaded surface made up of polygons, or by scanline conversion of these polygons to a raster image. Options include draping a data set on top of a surface, plotting of contours on top of the surface, and apply artificial illumination based on intensities provided in a separate grid.The region option can be used to select a map region larger or smaller than that implied by the extent of the grid. "
},

{
    "location": "grdview.html#Required-Arguments-1",
    "page": "grdview",
    "title": "Required Arguments",
    "category": "section",
    "text": "J or proj : proj=<parameters>\n Select map projection. More at proj\nJz or JZ or zscale or zsize : zscale=scale | zsize=size\n Set z-axis scaling or or z-axis size. zsize=size sets the size to the fixed value size  (for example zsize=10 or zsize=4i). zscale=scale sets the vertical scale to UNIT/z-unit."
},

{
    "location": "grdview.html#Optional-Arguments-1",
    "page": "grdview",
    "title": "Optional Arguments",
    "category": "section",
    "text": "B or axis or frame\n Set map boundary frame and axes attributes. More at axis\nC or color or cmap : color=cpt\n Where cpt is a GMTcpt type or a cpt file name. Alternatively, supply the name of a GMT color master  dynamic CPT [jet] to automatically determine a continuous CPT from the grid\'s z-range; you may round  up/down the z-range by adding +i zinc. Yet another option is to specify color=color1color2color3  or color=((r1g1b1)(r2g2b2)) to build a linear continuous CPT from those colors automatically (see Setting color). When not explicitly set, but a color map is needed, we will either use the current color map, if available (set by a previous call to makecpt), or the default jet color map. Must be present if you want (1) mesh plot with contours (surftype=(mesh=true)), or (2) shaded/colored perspective image (surftype=(surface=true) or surftype=(img=true)). For surftype=(surface=true) you can specify that you want to skip a z-slice by setting the red r/g/b component to -.\nG or drape : drape=grid | drape=(gridr, gridg, grid_b)\n Drape the image in drapegrid on top of the relief provided by reliefgrid. [Default determines colors from  reliefgrid]. Note that zsize and plane always refers to the reliefgrid. The drapegrid only provides  the information pertaining to colors, which (if drapegrid is a grid) will be looked-up via the CPT (see  color). Instead, you may give three grid files via separate drape options in the specified order.  These files must contain the red, green, and blue colors directly (in 0-255 range) and no CPT is needed.  The drapegrid may be of a different resolution than the reliefgrid. Finally, drapegrid may be an image to  be draped over the surface, in which case the color option is not required.\nI or shade or intensity : shade=grid | shade=azim | shade=(azimuth=az, norm=params, auto=true)\n Gives the name of a grid with intensities in the (-1,+1) range, or a constant intensity to apply everywhere  (affects the ambient light). Alternatively, derive an intensity grid from the input data grid grd_z via a  call to grdgradient; use shade=(azimuth=az) or shade=(azimuth=az norm=params) to specify azimuth  and intensity arguments for that module or just give shade=(auto=true) to select the default arguments  (azim=-45norm=t1). If you want a more specific intensity scenario then run grdgradient separately first.\nN or plane : plane=lev | plane=(lev, fill)\n  Draws a plane at this z-level. If the optional color is provided via plane=(lev fill), and the   projection is not oblique, the frontal facade between the plane and the data perimeter is colored.   See -Wf for setting the pen used for the outline.\nQ or surf or surftype : surftype=(mesh=true, waterfall=true, surface=true, image=true, nan_alpha=true, monochrome=true)\n  Select one of following settings. For any of these choices, you may force a monochrome image by setting   monochrome=true. Colors are then converted to shades of gray using the (monochrome television) YIQ   transformation. Note: pay attention to always use a tuple, even when only one option is used. This is   correct: surf=(img=true,) but this is wrong: surf=(img=true)Specify mesh=true for mesh plot [Default], and optionally set a color (see Setting color), with mesh=color, for a different mesh paint.Specify waterfall=true or my for waterfall plots (row or column profiles). Specify color as for plain mesh.Specify surface=true for surface plot, and optionally add mesh=true to have mesh lines drawn on top of surface.Specify image=true for image plot. Optionally use image=dpi to set the effective dpi resolution for the rasterization [100].Specify nan_alpha=true to do similar the aame as image=true but will make nodes with z = NaN transparent, using the colormasking feature in PostScript Level 3.R or region or limits : limits=(xmin, xmax, ymin, ymax) | limits=(BB=(xmin, xmax, ymin, ymax),)  | limits=(LLUR=(xmin, xmax, ymin, ymax),units=\"unit\") | ...more\n Specify the region of interest. More at limits. For perspective view view, optionally add  zmin,zmax. This option may be used to indicate the range used for the 3-D axes [Default is region given  by the reliefgrid]. You may ask for a larger w/e/s/n region to have more room between the image and the axes.  A smaller region than specified in the reliefgrid will result in a subset of the grid.\nS or smooth : smooth=smoothfactor\n Used to resample the contour lines at roughly every (gridbox_size/smoothfactor) interval.\nT or no_interp : no_interp=(skip=true, outlines=true)\n Plot image without any interpolation. This involves converting each node-centered bin into a polygon  which is then painted separately. Use skip=true to skip nodes with z = NaN. This option is useful  for categorical data where interpolating between values is meaningless. Optionally, add outlines=true  to draw the tile outlines. If the default pen is not to your liking, use outlines=pen  (see Pen attributes). As this option produces a flat surface it cannot be combined with -JZ or -Jz.\nU or stamp : stamp=true | stamp=(just=\"code\", pos=(dx,dy), label=\"label\", com=true)\n Draw GMT time stamp logo on plot. More at stamp\nV or verbose : verbose=true | verbose=level\n Select verbosity level. More at verbose\nW or pens\npens=(contour=true,)\nDraw contour lines on top of surface or mesh (not image). Use pens=(contour=true pen) to set pen   attributes used for the contours. [Default: width = 0.75p, color = black, style = solid].pens=(mesh=true, pen)\nSets the pen attributes used for the mesh. [Default: width = 0.25p, color = black, style = solid]. You must also select surftype=(mesh=true) or surftype=(surface=true mesh=true) for meshlines to be drawn.pens=(facade=true, pen)\nSets the pen attributes used for the facade. [Default: width = 0.25p, color = black, style = solid]. You must also select plane for the facade outline to be drawn.X or x_off or x_offset : xoff=[] | *xoff=x-shift | x_off=(shift=x-shift, mov=\"a|c|f|r\")\n Shift plot origin. More at x_off\nY or y_off or y_offset : yoff=[] | *yoff=y-shift | y_off=(shift=y-shift, mov=\"a|c|f|r\")\n Shift plot origin. More at y_off\nn or interp or interpol : interp=params\n Select interpolation mode for grids. More at interp\np or view or perspective : view=(azim, elev)\n Selects perspective view and sets the azimuth and elevation of the viewpoint. More at perspective\nt or transparency or alpha: alpha=50\n Set PDF transparency level for an overlay, in (0-100] percent range. [Default is 0, i.e., opaque].  Works only for the PDF and PNG formats."
},

{
    "location": "grdview.html#Examples-1",
    "page": "grdview",
    "title": "Examples",
    "category": "section",
    "text": "See the Example 04 at the Historical Collection gallery."
},

{
    "location": "lines.html#",
    "page": "lines",
    "title": "lines",
    "category": "page",
    "text": ""
},

{
    "location": "lines.html#lines-1",
    "page": "lines",
    "title": "lines",
    "category": "section",
    "text": "lines(cmd0::String=\"\", arg1=[]; kwargs...)Reads (x,y) pairs and plot lines with different levels of decoration. The input can either be a file name of a file with at least two columns (x,y), but optionally more, a GMTdatset object with also two or more columns.This module plots a large variety of lines and polygons. It goes from simple lines and polygons (color/pattern filled or not) to the so called decorated lines. That is, lines decorated with symbols and text patterns.This module is a subset of plot to make it simpler to draw line plots. So not all (fine) controlling parameters are not listed here. For the finest control, user should consult the plot module."
},

{
    "location": "lines.html#Parameters-1",
    "page": "lines",
    "title": "Parameters",
    "category": "section",
    "text": "B or axis or frame\nSet map boundary frame and axes attributes. Default is to draw and annotate left and bottom axes. More at axis\nJ or proj : proj=<parameters>\nSelect map projection. Default is linear and 14 cm width. More at proj\nR or region or limits : limits=(xmin, xmax, ymin, ymax) | limits=(BB=(xmin, xmax, ymin, ymax),)  | limits=(LLUR=(xmin, xmax, ymin, ymax),units=\"unit\") | ...more \n Specify the region of interest. Default limits are computed from data extents. More at limits\nG or markerfacecolor or mc or fill\n Select color or pattern for filling of polygons [Default is no fill]. Note that plot will search for fill  and pen settings in all the segment headers (when passing a GMTdaset or file of a multi-segment dataset)  and let any values thus found over-ride the command line settings (but those must be provided in the terse GMT  syntax). See Setting color for extend color selection (including colormap generation).\nW or pen=pen\n Set pen attributes for lines or the outline of symbols (except for the decorated lines that have their own  options to do it) [Defaults: width = default, color = black, style = solid]. See Pen attributes\ndecorated\n For all types of line decorations: symbols Decorated lines, fronts Front lines,  text Quoted lines, etc... see Line decorations\nU or stamp : stamp=true | stamp=(just=\"code\", pos=(dx,dy), label=\"label\", com=true)\n Draw GMT time stamp logo on plot. More at stamp\nV or verbose : verbose=true | verbose=level\n Select verbosity level. More at verbose\nX or x_off or x_offset : xoff=[] | *xoff=x-shift | x_off=(shift=x-shift, mov=\"a|c|f|r\")\n Shift plot origin. More at x_off\nY or y_off or y_offset : yoff=[] | *yoff=y-shift | y_off=(shift=y-shift, mov=\"a|c|f|r\")\n Shift plot origin. More at y_off"
},

{
    "location": "lines.html#Examples-1",
    "page": "lines",
    "title": "Examples",
    "category": "section",
    "text": "Decorated curve with blue stars    xy = gmt(\"gmtmath -T0/180/1 T SIND 4.5 ADD\");\n    lines(xy, axis=:af, pen=(1,:red), decorated=(dist=(2.5,0.25), symbol=:star,\n          symbsize=1, pen=(0.5,:green), fill=:blue, dec2=true), show=true)"
},

{
    "location": "scatter.html#",
    "page": "scatter",
    "title": "scatter",
    "category": "page",
    "text": ""
},

{
    "location": "scatter.html#scatter-1",
    "page": "scatter",
    "title": "scatter",
    "category": "section",
    "text": "scatter(cmd0::String=\"\", arg1=nothing; kwargs...)Reads (x,y) pairs and plot symbols at those locations on a map/figure. The input can either be a file name of a file with at least two columns (x,y), but optionally more, a GMTdatset object with also two or more columns.This module is a subset of plot to make it simpler to draw scatter plots. So many (fine) controlling parameters are not listed here. For a finer control, user should consult the plot module."
},

{
    "location": "scatter.html#Required-Arguments-1",
    "page": "scatter",
    "title": "Required Arguments",
    "category": "section",
    "text": "There are no required arguments but"
},

{
    "location": "scatter.html#Optional-Arguments-1",
    "page": "scatter",
    "title": "Optional Arguments",
    "category": "section",
    "text": "B or axis or frame\nSet map boundary frame and axes attributes. Default is to draw and annotate left and bottom axes. Extended at axis\nJ or proj : – proj=<parameters>\nSelect map projection. Default is linear and 14 cm width. Extended at proj\nR or region or limits : – limits=(xmin, xmax, ymin, ymax) | limits=(BB=(xmin, xmax, ymin, ymax),)  | limits=(LLUR=(xmin, xmax, ymin, ymax),units=\"unit\") | ...more \n Specify the region of interest. Default limits are computed from data extents. Extended at limits\nG or markerfacecolor or MarkerFaceColor or mc or fill\n Select color or pattern for filling of symbols [Default is no fill]. Note that plot will search for fill  and pen settings in all the segment headers (when passing a GMTdaset or file of a multi-segment dataset)  and let any values thus found over-ride the command line settings (but those must be provided in the terse GMT  syntax). See Setting color for extend color selection (including color map generation).\nS or symbol or marker or Marker or shape : – Default is circle with a diameter of 7 points\nsymbol=symbol string\n A full GMT compact string.\nsymbol=(symb=??, size=??, unit=??)\n Where symb is one Symbols like :circle, size is symbol size in cm, unless unit  is specified i.e. :points\nIn alternative to the symbol keyword, user can select the symbol name with either marker or shape  and symbol size with markersize ms or just size The value of these keywords can be either numeric  (symb meaning size in cm) or string if an unit is appended, e.g.  markersize=5p This form of symbol  selection allows also to specify a variable symbol size. All it\'s need for this is that the keyword\'s value  be an array with the same number of elements as the number of data points. "
},

{
    "location": "scatter.html#Examples-1",
    "page": "scatter",
    "title": "Examples",
    "category": "section",
    "text": "A simple scatter of ten points plotted as red circles of 7 points size    scatter(1:10,rand(10), fill=:red, show=true)A plot where symbol\'s size grows linearly    sizevec = [s for s = 1:10] ./ 10;\n    scatter(1:10, 1:10, markersize = sizevec, marker=:square, fill=:green, show=1)"
},

{
    "location": "scatter.html#See-also-1",
    "page": "scatter",
    "title": "See also",
    "category": "section",
    "text": "The GMT man page"
},

{
    "location": "scatter3.html#",
    "page": "scatter3",
    "title": "scatter3",
    "category": "page",
    "text": ""
},

{
    "location": "scatter3.html#scatter3-1",
    "page": "scatter3",
    "title": "scatter3",
    "category": "section",
    "text": "scatter3(cmd0::String=\"\", arg1=[]; kwargs...)Reads (x,y,z) triplets and plot symbols at those locations on a map. This module is a subset of plot to make it simpler to draw scatter plots. So many (fine) controlling parameters are not listed here. For a finer control, user should consult the plot module."
},

{
    "location": "scatter3.html#Parameters-1",
    "page": "scatter3",
    "title": "Parameters",
    "category": "section",
    "text": "B or axis or frame\nSet map boundary frame and axes attributes. Default is to draw and annotate left, bottom and verical axes and just draw left and tp axes. More at axis\nJ or proj : – proj=<parameters>\nSelect map projection. Default is linear and 14 cm width. More at proj\nR or region or limits : – limits=(xmin, xmax, ymin, ymax) | limits=(BB=(xmin, xmax, ymin, ymax),)  | limits=(LLUR=(xmin, xmax, ymin, ymax),units=\"unit\") | ...more \n Specify the region of interest. Default limits are computed from data extents. More at limits\nG or markerfacecolor or MarkerFaceColor or mc or fill\n Select color or pattern for filling of symbols [Default is black cubes]. Note that plot will search for fill  and pen settings in all the segment headers (when passing a GMTdaset or file of a multi-segment dataset)  and let any values thus found over-ride the command line settings (but those must provided in the terse GMT  syntax). See Setting color for extend color selection (including color map generation).\nS or symbol or marker or Marker or shape : –  Default is cube with size of 7 points\nsymbol=symbol string\n A full GMT compact string.\nsymbol=(symb=??, size=??, unit=??)\n Where symb is one Symbols like :circle, size is  symbol size in cm, unless unit is specified i.e. :points\nIn alternative to the symbol keyword, user can select the symbol name with either marker or shape  and symbol size with markersize, ms or just size. The value of these keywords can be either numeric  (symb meaning size in cm) or string if an unit is appended, e.g.  markersize=5p. This form of symbol  selection allows also to specify a variable symbol size. All it\'s need for this is that the keywrd\'s value  be an array with the same number of elements as the number of data points. \np or view\n Default is viewpoin from an azimuth of 200 and elevation of 30 degrees. Specify the viewpoint in terms  of azimuth and elevation. The azimuth is the horizontal rotation about the z-axis as measured in degrees  from the positive y-axis. That is, from North. This option is not yet fully expanded. Current alternatives  are:\nview=??\n A full GMT compact string with the full set of options.\nview=(azim,elev)\n A two elements tuple with azimuth and elevation"
},

{
    "location": "scatter3.html#Examples-1",
    "page": "scatter3",
    "title": "Examples",
    "category": "section",
    "text": "A scatter of ten points plotted as black cubes of 7 points size using the default perspective of 200,30    scatter3(rand(10,10,3), show=true)"
},

{
    "location": "scatter3.html#See-also-1",
    "page": "scatter3",
    "title": "See also",
    "category": "section",
    "text": "The GMT man page"
},

{
    "location": "solar.html#",
    "page": "solar",
    "title": "solar",
    "category": "page",
    "text": ""
},

{
    "location": "solar.html#solar-1",
    "page": "solar",
    "title": "solar",
    "category": "section",
    "text": "solar(cmd0::String=\"\", arg1=[]; kwargs...)Calculate and plot the day-night terminator and the civil, nautical and astronomical twilights."
},

{
    "location": "solar.html#Required-Arguments-1",
    "page": "solar",
    "title": "Required Arguments",
    "category": "section",
    "text": "There are no required arguments but either sun or terminators must be selected."
},

{
    "location": "solar.html#Optional-Arguments-1",
    "page": "solar",
    "title": "Optional Arguments",
    "category": "section",
    "text": "B or axis or frame\nSet map boundary frame and axes attributes. More at axis\nC or format : format=true\n Formats the report selected by sun=?? using tab-separated fields on a single line. The  output is Sun Lon Lat Azimuth Elevation in degrees, Sunrise Sunset Noon in decimal days,  day length in minutes, SolarElevationCorrected corrected for the effect of refraction index  and Equation of time in minutes. Note that if no position is provided in sun=(lon,lat) the  data after Elevation refers to the point (0,0).\ncoast : coast=true | coast=(full coast options list)\n When plotting a mapp this option calls the coast module to plot coastlines, rivers, etc...  The simple form coast=true will plot the coastlines with a black, 0.5 points thickness, pen.  Note, however, that with this option the coastlines are plotted on top of the terminators. If the  other way arround is needed, then you must do the usual two calls: coast + solar!\nG or fill : fill=color | G=:c\n Select color or pattern for filling of terminators; or use G=:c for clipping [Default is no fill].  Deactivate clipping by appending the output of gmt :doc:clip C.\nI or sun : sun=true | sun=(lon,lat) | sun=(pos=(lon,lat), date=date) | sun=(pos=(lon,lat), date=date, TZ=tzone)\n Print current sun position as well as Azimuth and Elevation. Use sun=(lon,lat) to print also the times of  Sunrise, Sunset, Noon and length of the day. To add a date, use a NamedTuple instead and add the element  date=date in ISO format, e.g, date=\"2000-04-25\" to compute sun parameters for this date. If necessary,  add another element with the time zone via TZ=tzone.\nJ or proj : proj=<parameters>\n Select map projection. More at proj\nM or dump : dump=true\n  Write terminator(s) as a multisegment file to standard output. No plotting occurs.\nN or invert : invert=true\n Invert the sense of what is inside and outside the terminator. Only used with clipping (G=:c) and  cannot be used together with axis.\nR or region or limits : limits=(xmin, xmax, ymin, ymax) | limits=(BB=(xmin, xmax, ymin, ymax),)  | limits=(LLUR=(xmin, xmax, ymin, ymax),units=\"unit\") | ...more   Specify the region of interest. More at limits\nT or terminators : terminators=\"d|c|n|a\" | terminators=(term=\"d|c|n|a\", date=date) | terminators=(term=\"d|c|n|a\", date=date), TZ=tzone)\n Plot (or dump; see dump) one or more terminators defined via the dcna flags. Where: d means  day/night terminator; c means civil twilight; n means nautical twilight; a means astronomical  twilight. To add a date, use a NamedTuple instead and add the element date=date in ISO format, e.g,  date=\"2000-04-25\" to know where the day-night was at that date. If necessary, add another element with  the time zone via TZ=tzone. \nU or stamp : stamp=true | stamp=(just=\"code\", pos=(dx,dy), label=\"label\", com=true)\n Draw GMT time stamp logo on plot. More at stamp\nV or verbose : verbose=true | verbose=level\n Select verbosity level. More at verbose\nW or pen : pen=pen\n Set pen attributes for lines or the outline of symbols [Defaults: width = default, color = black, style = solid].\nX or x_off or x_offset : xoff=[] | *xoff=x-shift | x_off=(shift=x-shift, mov=\"a|c|f|r\")\n Shift plot origin. More at x_off\nY or y_off or y_offset : yoff=[] | *yoff=y-shift | y_off=(shift=y-shift, mov=\"a|c|f|r\")\n Shift plot origin. More at y_off"
},

{
    "location": "solar.html#Examples-1",
    "page": "solar",
    "title": "Examples",
    "category": "section",
    "text": "Print current Sun position and Sunrise, Sunset times at:    solar(sun=(pos=(-7.93,37.079), date=\"2016-02-04T10:01:00\"))Plot the day-night and civil twilight     coast(region=:d, shore=0.1, proj=\"Q0/14c\", axis=(annot=:auto, axes=\"WSen\"),\n          resolution=:low, area=1000)\n    solar!(pen=1, terminators=\"dc\", show=true)But it is much nicer if we paint the terminators    coast(region=:d, proj=\"Ks0/12\", resolution=:low, area=5000, borders=\"1/0.5p,gray\",\n          water=(175,210,255), axis=(annot=:a,ticks=:a,grid=:a), shore=0.5) \n    solar!(terminators=(term=:d, date=\"2016-02-09T16:00:00\"), fill=\"navy@95\")\n    solar!(terminators=(term=:c, date=\"2016-02-09T16:00:00\"), fill=\"navy@85\")\n    solar!(terminators=(term=:n, date=\"2016-02-09T16:00:00\"), fill=\"navy@80\")\n    solar!(terminators=(term=:a, date=\"2016-02-09T16:00:00\"), fill=\"navy@80\",\n    fmt=:png, show=true)"
},

{
    "location": "solar.html#See-also-1",
    "page": "solar",
    "title": "See also",
    "category": "section",
    "text": "The GMT man page"
},

{
    "location": "types.html#",
    "page": "The GMT types",
    "title": "The GMT types",
    "category": "page",
    "text": ""
},

{
    "location": "types.html#The-GMT.jl-types-1",
    "page": "The GMT types",
    "title": "The GMT.jl types",
    "category": "section",
    "text": ""
},

{
    "location": "types.html#Grid-type-1",
    "page": "The GMT types",
    "title": "Grid type",
    "category": "section",
    "text": "type GMTgrid                  # The type holding a local header and data of a GMT grid\n   proj4::String              # Projection string in PROJ4 syntax (Optional)\n   wkt::String                # Projection string in WKT syntax (Optional)\n   range::Array{Float64,1}    # 1x6 vector with [x_min x_max y_min y_max z_min z_max]\n   inc::Array{Float64,1}      # 1x2 vector with [x_inc y_inc]\n   registration::Int          # Registration type: 0 -> Grid registration; 1 -> Pixel registration\n   nodata::Float64            # The value of nodata\n   title::String              # Title (Optional)\n   comment::String            # Remark (Optional)\n   command::String            # Command used to create the grid (Optional)\n   datatype::String           # \'float\' or \'double\'\n   x::Array{Float64,1}        # [1 x n_columns] vector with XX coordinates\n   y::Array{Float64,1}        # [1 x n_rows]    vector with YY coordinates\n   z::Array{Float32,2}        # [n_rows x n_columns] grid array\n   x_units::String            # Units of XX axis (Optional)\n   y_units::String            # Units of YY axis (Optional)\n   z_units::String            # Units of ZZ axis (Optional)\n   layout::String             # A three character string describing the grid memory layout\nend"
},

{
    "location": "types.html#Image-type-1",
    "page": "The GMT types",
    "title": "Image type",
    "category": "section",
    "text": "type GMTimage                 # The type holding a local header and data of a GMT image\n   proj4::String              # Projection string in PROJ4 syntax (Optional)\n   wkt::String                # Projection string in WKT syntax (Optional)\n   range::Array{Float64,1}    # 1x6 vector with [x_min x_max y_min y_max z_min z_max]\n   inc::Array{Float64,1}      # 1x2 vector with [x_inc y_inc]\n   registration::Int          # Registration type: 0 -> Grid registration; 1 -> Pixel registration\n   nodata::Float64            # The value of nodata\n   title::String              # Title (Optional)\n   comment::String            # Remark (Optional)\n   command::String            # Command used to create the image (Optional)\n   datatype::String           # \'uint8\' or \'int8\' (needs checking)\n   x::Array{Float64,1}        # [1 x n_columns] vector with XX coordinates\n   y::Array{Float64,1}        # [1 x n_rows]    vector with YY coordinates\n   image::Array{UInt8,3}      # [n_rows x n_columns x n_bands] image array\n   x_units::String            # Units of XX axis (Optional)\n   y_units::String            # Units of YY axis (Optional)\n   z_units::String            # Units of ZZ axis (Optional) ==> MAKES NO SENSE\n   colormap::Array{Clong,1}   # \n   alpha::Array{UInt8,2}      # A [n_rows x n_columns] alpha array\n   layout::String             # A four character string describing the image memory layout\nend"
},

{
    "location": "types.html#Dataset-type-1",
    "page": "The GMT types",
    "title": "Dataset type",
    "category": "section",
    "text": "type GMTdataset\n    data::Array{Float64,2}     # Mx2 Matrix with segment data\n    text::Array{Any,1}         # Array with text after data coordinates (mandatory only when plotting Text)\n    header::String             # String with segment header (Optional but sometimes very useful)\n    comment::Array{Any,1}      # Array with any dataset comments [empty after first segment]\n    proj4::String              # Projection string in PROJ4 syntax (Optional)\n    wkt::String                # Projection string in WKT syntax (Optional)\nend"
},

{
    "location": "types.html#CPT-type-1",
    "page": "The GMT types",
    "title": "CPT type",
    "category": "section",
    "text": "type GMTcpt\n    colormap::Array{Float64,2}\n    alpha::Array{Float64,1}\n    range::Array{Float64,2}\n    minmax::Array{Float64,1}\n    bfn::Array{Float64,2}\n    depth::Cint\n    hinge::Cdouble\n    cpt::Array{Float64,2}\n    model::String\n    comment::Array{Any,1}   # Cell array with any comments\nend"
},

{
    "location": "types.html#Postscript-type-1",
    "page": "The GMT types",
    "title": "Postscript type",
    "category": "section",
    "text": "type GMTps\n    postscript::String      # Actual PS plot (text string)\n    length::Int             # Byte length of postscript\n    mode::Int               # 1 = Has header, 2 = Has trailer, 3 = Has both\n    comment::Array{Any,1}   # Cell array with any comments\nend"
},

{
    "location": "index.html#",
    "page": "Index",
    "title": "Index",
    "category": "page",
    "text": ""
},

{
    "location": "index.html#Index-1",
    "page": "Index",
    "title": "Index",
    "category": "section",
    "text": ""
},

{
    "location": "index.html#GMT.arrows",
    "page": "Index",
    "title": "GMT.arrows",
    "category": "function",
    "text": "arrows(cmd0::String=\"\", arg1=nothing; arrow=(...), kwargs...)\n\nReads a file or (x,y) pairs and plots an arrow field\n\nWhen the keyword arrow=(...) or vector=(...) is used, the direction (in degrees counter-clockwise from horizontal) and length must be found in columns 3 and 4, and size, if not specified on the command-line, should be present in column 5. The size is the length of the vector head. Vector stem width is set by option pen or line_attrib.\n\nThe vecmap=(...) variation is similar to above except azimuth (in degrees east of north) should be given instead of direction. The azimuth will be mapped into an angle based on the chosen map projection. If length is not in plot units but in arbitrary user units (e.g., a rate in mm/yr) then you can use the input_col option to scale the corresponding column via the +sscale modifier.\n\nThe geovec=(...) or geovector=(...) keywords plot geovectors. In geovectors azimuth (in degrees east from north) and geographical length must be found in columns 3 and 4. The size is the length of the vector head. Vector width is set by pen or line_attrib. Note: Geovector stems are drawn as thin filled polygons and hence pen attributes like dashed and dotted are not available. For allowable geographical units, see the units=() option.\n\nThe full arrow options list can be consulted at Vector Attributes\n\nB : axis : – Str – \nSet map boundary frame and axes attributes.   -B\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nW : pen : line_attrib : – Str –\nSet pen attributes for lines or the outline of symbols   -W\n\nExample:\n\narrows([0 8.2 0 6], limits=(-2,4,0,9), arrow=(len=2,stop=1,shape=0.5,fill=:red), J=14, axis=:a, pen=\"6p\", show=true)\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.bar",
    "page": "Index",
    "title": "GMT.bar",
    "category": "function",
    "text": "bar(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nReads a file or (x,y) pairs and plots vertical bars extending from base to y.\n\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nB : axis : – Str – \nSet map boundary frame and axes attributes.   -B\nfill : – Str –\nSelect color or pattern for filling the bars   -G\nbase : bottom : – Str or Num –		key=value\nBy default, base = ymin. Use this option to change that value. If base is not appended then we read it.   from the last input data column.\nsize : width : – Str or Num –		key=value\nThe size or width is the bar width. Append u if size is in x-units. When width is used the default is plot-distance units.\n\nExample:\n\nbar(sort(randn(10)), fill=:black, axis=:auto, show=true)\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.bar3",
    "page": "Index",
    "title": "GMT.bar3",
    "category": "function",
    "text": "bar3(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nRead a grid file, a grid or a MxN matrix and plots vertical bars extending from base to z.\n\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nB : axis : – Str – \nSet map boundary frame and axes attributes.   -B\nfill : – Str –		key=color\nSelect color or pattern for filling the bars   -G\nbase : – Str or Num –		key=value\nBy default, base = ymin. Use this option to change that value. If base is not appended then we read it.\np : view : perspective : – Str or List –   Flags = [x|y|z]azim[/elev[/zlevel]][+wlon0/lat0[/z0]][+vx0/y0]\nSelects perspective view and sets the azimuth and elevation of the viewpoint [180/90].   -p\n\nExample:\n\nG = gmt(\"grdmath -R-15/15/-15/15 -I0.5 X Y HYPOT DUP 2 MUL PI MUL 8 DIV COS EXCH NEG 10 DIV EXP MUL =\");\nbar3(G, lw=:thinnest, show=true)\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.basemap",
    "page": "Index",
    "title": "GMT.basemap",
    "category": "function",
    "text": "basemap(cmd0::String=\"\"; kwargs...)\n\nPlot base maps and frames.\n\nFull option list at psbasemap\n\nParameters\n\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nA : polygon : – Str or [] –\nNo plotting is performed. Instead, we determine the geographical coordinates of the polygon   outline for the (possibly oblique) rectangular map domain.    -A\nB : axis : – Str – \nSet map boundary frame and axes attributes.   -B\nD : inset : – Str –\nDraw a simple map insert box on the map. Requires -F.   -D\nF : box : – Str –\nWithout further options, draws a rectangular border around any map insert (D), map scale (L)   or map rose (T)   -F\nJz : z_axis : – ::String –\nSet z-axis scaling.    -Jz\nL : map_scale : – Str –\nDraw a map scale.   -L\nP : portrait : –- Bool or [] –\nTell GMT to NOT draw in portriat mode (that is, make a Landscape plot)\nTd : rose` : – Str –\nDraws a map directional rose on the map at the location defined by the reference and anchor points.   -Td\nTm : compass : – Str –\nDraws a map magnetic rose on the map at the location defined by the reference and anchor points.   -Tm\nU : stamp : – Str or Bool or [] –	Flags = [[just]/dx/dy/][c|label]\nDraw GMT time stamp logo on plot.   -U\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nX : x_offset : – Str –     Flags = acfrx-shiftu\nY : y_offset : – Str –     Flags = acfry-shiftu\nShift plot origin relative to the current origin by (x-shift,y-shift) and optionally   append the length unit (c, i, or p).    -Y\nbo : binary_out : – Str –			Flags = ncolstypew+L+B\nSelect native binary output.   -bo\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\np : view : perspective : – Str or List –   Flags = [x|y|z]azim[/elev[/zlevel]][+wlon0/lat0[/z0]][+vx0/y0]\nSelects perspective view and sets the azimuth and elevation of the viewpoint [180/90].   -p\nt : alpha : transparency : – Str –   Flags = transp\nSet PDF transparency level for an overlay, in (0-100] percent range. [Default is 0, i.e., opaque].   -t\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.blockmean",
    "page": "Index",
    "title": "GMT.blockmean",
    "category": "function",
    "text": "blockmean(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nBlock average (x,y,z) data tables by L2 norm.\n\nFull option list at blockmean\n\nParameters\n\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nI : inc : – Str or Number –\nx_inc [and optionally y_inc] is the grid spacing.   -I\nA : fields : – Str –\nSelect which fields to write to individual grids. Append comma-separated codes for available   fields: z (the mean data z, but see -S), s (standard deviation), l (lowest value),   h (highest value) and w (the output weight; requires -W). [Default is just z].   -A\nC : center : – Bool –\nUse the center of the block as the output location [Default uses the mean location]. Not used when -A   -C\nE : extend : – Str or [] –\nProvide Extended report which includes s (the standard deviation about the mean), l, the lowest   value, and h, the high value for each block. Output order becomes x,y,z,s,l,h[,w]. [Default   outputs x,y,z[,w]. See -W for w output. If -Ep is used we assume weights are 1/(sigma squared)   and s becomes the propagated error of the mean.   -E\nG : grid : gridfile : – Str or [] –\nWrite one or more fields directly to grids on disk; no table data are return. If more than one   fields are specified via A then grdfile must contain the format flag %s so that we can embed the   field code in the file names. If not provided but A is used, return 1 or more GMTgrid type(s).   -G\nS : npts : numberofpoints – Str or [] –  \nUse S=:n to report the number of points inside each block, S=:s to report the sum of all z-values    inside a block, S=:w to report the sum of weights [Default (or S=:m reports mean value].   -S\nW : weights : – Str or [] –\nUnweighted input and output have 3 columns x,y,z; Weighted i/o has 4 columns x,y,z,w. Weights can   be used in input to construct weighted mean values for each block.   -W\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nbi : binary_in : – Str –			Flags = ncolstypew+L+B\nSelect native binary format for primary input (secondary inputs are always ASCII).   -bi\ndi : nodata_in : – Str or Number –      Flags = nodata\nExamine all input columns and if any item equals nodata we interpret this value as a   missing data item and substitute the value NaN.   -di\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\nr : reg : registration : – Bool or [] –\nForce pixel node registration [Default is gridline registration].   -r\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.blockmedian",
    "page": "Index",
    "title": "GMT.blockmedian",
    "category": "function",
    "text": "blockmedian(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nBlock average (x,y,z) data tables by L1 norm.\n\nFull option list at blockmedian\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.blockmode",
    "page": "Index",
    "title": "GMT.blockmode",
    "category": "function",
    "text": "blockmode(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nBlock average (x,y,z) data tables by mode estimation.\n\nFull option list at blockmode\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.clip",
    "page": "Index",
    "title": "GMT.clip",
    "category": "function",
    "text": "clip(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nReads (length,azimuth) pairs from file and plot a windclip diagram.\n\nFull option list at psclip\n\nParameters\n\nC : endclippath : – Bool or [] –\nMark end of existing clip path. No input file is needed.   -C\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nA : inc : – Str or [] –\nBy default, geographic line segments are connected as great circle arcs. To connect them as straight lines, use A \n\n[`-A`](http://gmt.soest.hawaii.edu/doc/latest/psclip.html#A)\n\nB : axis : – Str – \nSet map boundary frame and axes attributes.   -B\nJz : z_axis : – ::String –\nSet z-axis scaling.    -Jz\nN : invert : – Bool or [] –\nInvert the sense of the test, i.e., clip regions where there is data coverage.   -N\nP : portrait : –- Bool or [] –\nTell GMT to NOT draw in portriat mode (that is, make a Landscape plot)\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nT : clip_limits : – Bool or [] –\nRather than read any input files, simply turn on clipping for the current map region.\n\n[`-T`](http://gmt.soest.hawaii.edu/doc/latest/psclip.html#t)\n\nU : stamp : – Str or Bool or [] –	Flags = [[just]/dx/dy/][c|label]\nDraw GMT time stamp logo on plot.   -U\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nX : x_offset : – Str –     Flags = acfrx-shiftu\nY : y_offset : – Str –     Flags = acfry-shiftu\nShift plot origin relative to the current origin by (x-shift,y-shift) and optionally   append the length unit (c, i, or p).    -Y\nbi : binary_in : – Str –			Flags = ncolstypew+L+B\nSelect native binary format for primary input (secondary inputs are always ASCII).   -bi\ndi : nodata_in : – Str or Number –      Flags = nodata\nExamine all input columns and if any item equals nodata we interpret this value as a   missing data item and substitute the value NaN.   -di\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\ng : gaps : – Str –           Flags = axydXYDcolz+-gapu\nExamine the spacing between consecutive data points in order to impose breaks in the line.   -g\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\np : view : perspective : – Str or List –   Flags = [x|y|z]azim[/elev[/zlevel]][+wlon0/lat0[/z0]][+vx0/y0]\nSelects perspective view and sets the azimuth and elevation of the viewpoint [180/90].   -p\nt : alpha : transparency : – Str –   Flags = transp\nSet PDF transparency level for an overlay, in (0-100] percent range. [Default is 0, i.e., opaque].   -t\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.coast",
    "page": "Index",
    "title": "GMT.coast",
    "category": "function",
    "text": "coast(cmd0::String=\"\"; kwargs...)\n\nPlot continents, shorelines, rivers, and borders on maps. Plots grayshaded, colored, or textured land-masses [or water-masses] on maps and [optionally] draws coastlines, rivers, and political boundaries. A map projection must be supplied.\n\nFull option list at pscoast\n\nParameters\n\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nA : area : – Str or Number –\nFeatures with an area smaller than minarea in km^2 or of   hierarchical level that is lower than minlevel or higher than   max_level will not be plotted.   -A\nB : axis : – Str – \nSet map boundary frame and axes attributes.   -B\nC : river_fill : – Str –\nSet the shade, color, or pattern for lakes and river-lakes.   -C\nD : res : resolution : – Str –		Flags = c|l|i|h|f|a\nSelects the resolution of the data set to use ((f)ull, (h)igh, (i)ntermediate, (l)ow, (c)rude), or (a)uto).   -D\nE : DCW : – Str –\nSelect painting or dumping country polygons from the Digital Chart of the World.   -E\nTuple(\"code\", Str); Tuple(\"code\" [,\"fill\"], (pen)); Tuple((...),(...),...)\nex: (\"PT\",(0.5,\"red\",\"–\")); ((\"PT\",\"gblue\",(0.5,\"red\"),(\"ES\",(0.5,\"yellow\")))\nF : box : – Str –\nDraws a rectangular border around the map scale or rose.   -F\nG : land : – Str –\nSelect filling or clipping of “dry” areas.   -G\nI : rivers : – Str –\nDraw rivers. Specify the type of rivers and [optionally] append pen attributes.   -I\nL : map_scale : – Str –\nDraw a map scale.   -L\nM : dump : – Str –\nDumps a single multisegment ASCII output. No plotting occurs.   -M\nN : borders : – Str –\nDraw political boundaries. Specify the type of boundary and [optionally] append pen attributes   -N\nP : portrait : –- Bool or [] –\nTell GMT to NOT draw in portriat mode (that is, make a Landscape plot)\nclip : – Str –		Flags = land|water|end\nTo clip land do clip=:land, clip=:water clips water. Use end to mark end of existing clip path.   No projection information is needed.   -Q\nS : water : ocean : – Str –\nSelect filling or clipping of “wet” areas.   -S\nTd : rose` : – Str –\nDraws a map directional rose on the map at the location defined by the reference and anchor points.   -Td\nTm : compass : – Str –\nDraws a map magnetic rose on the map at the location defined by the reference and anchor points.   -Tm\nU : stamp : – Str or Bool or [] –	Flags = [[just]/dx/dy/][c|label]\nDraw GMT time stamp logo on plot.   -U\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nW : shore : – Str –   Draw shorelines [Default is no shorelines]. Append pen attributes.   -W\nX : x_offset : – Str –     Flags = acfrx-shiftu\nY : y_offset : – Str –     Flags = acfry-shiftu\nShift plot origin relative to the current origin by (x-shift,y-shift) and optionally   append the length unit (c, i, or p).    -Y\nbo : binary_out : – Str –			Flags = ncolstypew+L+B\nSelect native binary output.   -bo\np : view : perspective : – Str or List –   Flags = [x|y|z]azim[/elev[/zlevel]][+wlon0/lat0[/z0]][+vx0/y0]\nSelects perspective view and sets the azimuth and elevation of the viewpoint [180/90].   -p\nt : alpha : transparency : – Str –   Flags = transp\nSet PDF transparency level for an overlay, in (0-100] percent range. [Default is 0, i.e., opaque].   -t\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.colorbar",
    "page": "Index",
    "title": "GMT.colorbar",
    "category": "function",
    "text": "colorbar(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nPlots gray scales or color scales on maps.\n\nFull option list at psscale\n\nD : pos : position : – Str –\nDefines the reference point on the map for the color scale using one of four coordinate systems.   -D\nB : axis : – Str – \nSet map boundary frame and axes attributes.   -B\nC : color : cmap : – Str –		Flags = cpt master+izinc color1color2*color3*\nGive a CPT name or specify -Ccolor1,color2[,color3,...] to build a linear continuous CPT from those   colors automatically.   -C\nF : box : – Str –\nDraws a rectangular border around the scale.   -F\nG : truncate : – Str –  \nTruncate the incoming CPT so that the lowest and highest z-levels are to zlo and zhi.   -G\nI : shade : – Number or [] –  \nAdd illumination effects.   -I\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nJz : z_axis : – ::String –\nSet z-axis scaling.    -Jz\nL : equal : equal_size : – Str or [] –\nGives equal-sized color rectangles. Default scales rectangles according to the z-range in the CPT.   -L\nM : monochrome : – Bool or [] –\nForce conversion to monochrome image using the (television) YIQ transformation.   -M\nN : dpi : – Str or number –\nControls how the color scale is represented by the PostScript language.   -N\nQ : log : – Str –\nSelects a logarithmic interpolation scheme [Default is linear].   -Q\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nS : nolines : – Bool or [] –\nDo not separate different color intervals with black grid lines.\nU : stamp : – Str or Bool or [] –	Flags = [[just]/dx/dy/][c|label]\nDraw GMT time stamp logo on plot.   -U\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nW : zscale : – Number –\nMultiply all z-values in the CPT by the provided scale.   -W\nZ : zfile : – Str –\nFile with colorbar-width per color entry.   -Z\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.contour",
    "page": "Index",
    "title": "GMT.contour",
    "category": "function",
    "text": "contour(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nReads a table data and produces a raw contour plot by triangulation.\n\nFull option list at contour\n\nParameters\n\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nA : annot : – Str or Number –       Flags = [-|[+]annot_int][labelinfo]\nannot_int is annotation interval in data units; it is ignored if contour levels are given in a file.   -A\nB : axis : – Str – \nSet map boundary frame and axes attributes.   -B\nC : cont : contours : levels : – Str or Number or GMTcpt –  Flags = [+]cont_int\nContours contours to be drawn may be specified in one of three possible ways.   -C\nD : dump : – Str –\nDump contours as data line segments; no plotting takes place.   -D\nE : index : – Str or Mx3 array –\nGive name of file with network information. Each record must contain triplets of node   numbers for a triangle.   -E\nG : labels : – Str –\nControls the placement of labels along the quoted lines.   -G\nI : fill : colorize : – Bool or [] –\nColor the triangles using the color scale provided via C.   -I\nJz : z_axis : – ::String –\nSet z-axis scaling.    -Jz\nL : mesh : – Str or Number –\nDraw the underlying triangular mesh using the specified pen attributes (if not provided, use default pen)   -L\nN : no_clip : –- Bool or [] –\nDo NOT clip contours or image at the boundaries [Default will clip to fit inside region].   -N\nP : portrait : –- Bool or [] –\nTell GMT to NOT draw in portriat mode (that is, make a Landscape plot)\nQ : cut : – Str or Number –         Flags = [cut[unit]][+z]]\nDo not draw contours with less than cut number of points.   -Q\nS : skip : – Str or [] –            Flags = [p|t]\nSkip all input xyz points that fall outside the region.   -S\nT : ticks : – Str –                 Flags = [+|-][+a][+dgap[/length]][+l[labels]]\nDraw tick marks pointing in the downward direction every gap along the innermost closed contours.   -T\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nU : stamp : – Str or Bool or [] –	Flags = [[just]/dx/dy/][c|label]\nDraw GMT time stamp logo on plot.   -U\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nW : pen : – Str or Number –\nSets the attributes for the particular line.   -W\nX : x_offset : – Str –     Flags = acfrx-shiftu\nY : y_offset : – Str –     Flags = acfry-shiftu\nShift plot origin relative to the current origin by (x-shift,y-shift) and optionally   append the length unit (c, i, or p).    -Y\nZ : scale : – Str –\nUse to subtract shift from the data and multiply the results by factor before contouring starts.   -Z\nbi : binary_in : – Str –			Flags = ncolstypew+L+B\nSelect native binary format for primary input (secondary inputs are always ASCII).   -bi\nbo : binary_out : – Str –			Flags = ncolstypew+L+B\nSelect native binary output.   -bo\nd : nodata : – Str or Number –		Flags = ionodata\nControl how user-coded missing data values are translated to official NaN values in GMT.   -d\ndi : nodata_in : – Str or Number –      Flags = nodata\nExamine all input columns and if any item equals nodata we interpret this value as a   missing data item and substitute the value NaN.   -di\ndo : nodata_out : – Str or Number –     Flags = nodata\nExamine all output columns and if any item equals NAN substitute it with   the chosen missing data value.   -do\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\np : view : perspective : – Str or List –   Flags = [x|y|z]azim[/elev[/zlevel]][+wlon0/lat0[/z0]][+vx0/y0]\nSelects perspective view and sets the azimuth and elevation of the viewpoint [180/90].   -p\nt : alpha : transparency : – Str –   Flags = transp\nSet PDF transparency level for an overlay, in (0-100] percent range. [Default is 0, i.e., opaque].   -t\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.filter1d",
    "page": "Index",
    "title": "GMT.filter1d",
    "category": "function",
    "text": "filter1d(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nTime domain filtering of 1-D data tables.\n\nFull option list at filter1d\n\nParameters\n\nF : filter_type : – Str –   Flags = type width[modifiers]\nSets the filter type. Choose among convolution and non-convolution filters. Append the   filter code followed by the full filter width in same units as time column.   -F\nD : inc : – Number –        Flags = increment\nincrement is used when series is NOT equidistantly sampled. Then increment will be the abscissae resolution.   -D\nE : ends : – Bool or [] –\nInclude Ends of time series in output. Default loses half the filter-width of data at each end.   -E\nN : time_col : – Int –      Flags = t_col\nIndicates which column contains the independent variable (time). The left-most column   is # 0, the right-most is # (n_cols - 1). [Default is 0].   -N\nQ : quality : – Number –    Flags = q_factor\nAssess Quality of output value by checking mean weight in convolution. Enter q_factor between 0 and 1.   -Q\nS : symetry : – Number –    Flags = symmetry_factor\nChecks symmetry of data about window center. Enter a factor between 0 and 1.   -S\nT : equi_space : – List or Str –     Flags = [min/max/]inc[+a|n]\nMake evenly spaced time-steps from min to max by inc [Default uses input times].   -T\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nwrite : |> : Str –     Flags = fname\nSave result to ASCII file instead of returning to a Julia variable. Give file name as argument.   Use the bo option to save as a binary file.\nappend : Str –     Flags = fname\nAppend result to an existing file named fname instead of returning to a Julia variable.   Use the bo option to save as a binary file.\nb : binary : – Str –\n-b\nd : nodata : – Str or Number –		Flags = ionodata\nControl how user-coded missing data values are translated to official NaN values in GMT.   -d\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\ng : gaps : – Str –           Flags = axydXYDcolz+-gapu\nExamine the spacing between consecutive data points in order to impose breaks in the line.   -g\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\no : outcol : – Str –     Flags = cols\nSelect specific data columns for primary output, in arbitrary order.   -o\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.fitcircle",
    "page": "Index",
    "title": "GMT.fitcircle",
    "category": "function",
    "text": "fitcircle(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nFind mean position and great [or small] circle fit to points on a sphere.\n\nFull option list at fitcircle\n\nParameters\n\nL : norm : – Int or [] –\nSpecify the desired norm as 1 or 2, or use [] or 3 to see both solutions.\n\n[`-D`](http://gmt.soest.hawaii.edu/doc/latest/fitcircle.html#d)\n\nF : coord : coordinates : – Str –	Flags = f|m|n|s|c\nOnly return data coordinates, and append flags to specify which coordinates you would like.   -F\nS : symetry : – Number –    Flags = symmetry_factor\nAttempt to   -S\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nwrite : |> : Str –     Flags = fname\nSave result to ASCII file instead of returning to a Julia variable. Give file name as argument.   Use the bo option to save as a binary file.\nappend : Str –     Flags = fname\nAppend result to an existing file named fname instead of returning to a Julia variable.   Use the bo option to save as a binary file.\nbi : binary_in : – Str –			Flags = ncolstypew+L+B\nSelect native binary format for primary input (secondary inputs are always ASCII).   -bi\ndi : nodata_in : – Str or Number –      Flags = nodata\nExamine all input columns and if any item equals nodata we interpret this value as a   missing data item and substitute the value NaN.   -di\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\ng : gaps : – Str –           Flags = axydXYDcolz+-gapu\nExamine the spacing between consecutive data points in order to impose breaks in the line.   -g\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\no : outcol : – Str –     Flags = cols\nSelect specific data columns for primary output, in arbitrary order.   -o\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.gmt-Tuple{String,Vararg{Any,N} where N}",
    "page": "Index",
    "title": "GMT.gmt",
    "category": "method",
    "text": "Call a GMT module. Usage:\n\ngmt(\"module_name `options`\")\n\nExample. To plot a simple map of Iberia in the postscript file nammed lixo.ps do:\n\ngmt(\"pscoast -R-10/0/35/45 -B1 -W1 -Gbrown -JM14c -P -V > lixo.ps\")\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.gmt2kml",
    "page": "Index",
    "title": "GMT.gmt2kml",
    "category": "function",
    "text": "gmt2kml(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nConvert GMT data tables to KML files for Google Earth\n\nFull option list at gmt2kml\n\nParameters\n\nA : altitude_mode : – Str –       Flags = a|g|s[alt|xscale]\nSelect one of three altitude modes recognized by Google Earth that determines the altitude (in m)   of the feature: a absolute altitude, g altitude relative to sea surface or ground,   s altitude relative to seafloor or ground.   -A\nC : color : cmap : – Str –		Flags = cpt master+izinc color1color2*color3*\nGive a CPT name or specify -Ccolor1,color2[,color3,...] to build a linear continuous CPT from those   colors automatically.   -C\nD : descript : – Str –   Flags = descriptfile\nFile with HTML snippets that will be included as part of the main description content for the KML file.   -D\nE : extrude : – Str or [] –   Flags = [altitude]\nExtrude feature down to ground level.   -E\nF : feature_type : – Str –   Flags = e|s|t|l|p|w\nSets the feature type. Choose from points (event, symbol, or timespan), line, polygon, or wiggle.   -F\nG : fill : – Str –  Flags = f|nfill\nSets color fill (G=:f) or label font color (G=:n).   -G\nI : icon : – Str –      Flags = icon\nSpecify the URL to an alternative icon that should be used for the symbol   [Default is a Google Earth circle].   -I\nK : not_finished : – Bool or [] –\nAllow more KML code to be appended to the output later [finalize the KML file].   -K\nL : extended_data : – Str –      Flags = name1,name2,…\nExtended data given. Append one or more column names separated by commas.   -L\nN : feature_name : – Str or Number –      Flags = [t|col |name_template|name]\nBy default, if segment headers contain a -L”label string” then we use that for the name of the KML feature.   -N\nO : overlay : – Bool or [] –\nAppend KML code to an existing KML file [initialize a new KML file].   -O\nQa : wiggles : – Str –      Flags =  azimuth\nOption in support of wiggle plots (requires F=:w).   -Q\nQs : wiggle_scale : – Number or Str –      Flags =  scale[unit]\nRequired setting for wiggle plots (i.e., it requires F=:w). Sets a wiggle scale   in z-data units per the user’s units   -Q\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nS : scale : – Str –      Flags =  c|nscale\nScale icons or labels. Here, S=:c sets a scale for the symbol icon, whereas S=:n sets   a scale for the name labels   -S\nT : **title ** : – Str –    Flags = title[/foldername]\nSets the document title [default is unset]. Optionally, append /FolderName;   -T\nW : pen : – Str or [] –      Flags =  [pen][attr]\nSet pen attributes for lines, wiggles or polygon outlines.   -W\nZ : attrib : – Str –      Flags =  args\nSet one or more attributes of the Document and Region tags.   -Z\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nwrite : |> : Str –     Flags = fname\nSave result to ASCII file instead of returning to a Julia variable. Give file name as argument.   Use the bo option to save as a binary file.\nappend : Str –     Flags = fname\nAppend result to an existing file named fname instead of returning to a Julia variable.   Use the bo option to save as a binary file.\nbi : binary_in : – Str –			Flags = ncolstypew+L+B\nSelect native binary format for primary input (secondary inputs are always ASCII).   -bi\ndi : nodata_in : – Str or Number –      Flags = nodata\nExamine all input columns and if any item equals nodata we interpret this value as a   missing data item and substitute the value NaN.   -di\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.gmtconnect",
    "page": "Index",
    "title": "GMT.gmtconnect",
    "category": "function",
    "text": "gmtconnect(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nConnect individual lines whose end points match within tolerance\n\nFull option list at gmtconnect\n\nParameters\n\nC : closed : – Str or [] –        Flags = [closed]\nWrite all the closed polygons to closed [gmtgmtconnect_closed.txt] and return all other   segments as they are. No gmtconnection takes place.   -C\nD : dump : – Str or [] –   Flags = [template]\nFor multiple segment data, dump each segment to a separate output file   -D\nL : linkfile : – Str or [] –      Flags = [linkfile]\nWrites the link information to the specified file [gmtgmtconnect_link.txt].   -L\nQ : list_file : – Str or [] –      Flags =  [listfile]\nUsed with D to write a list file with the names of the individual output files.   -Q\nT : **tolerance ** : – List or Str –    Flags = [cutoff[unit][/nn_dist]]\nSpecifies the separation tolerance in the data coordinate units [0]; append distance unit.   If two lines has end-points that are closer than this cutoff they will be joined.   -T\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nwrite : |> : Str –     Flags = fname\nSave result to ASCII file instead of returning to a Julia variable. Give file name as argument.   Use the bo option to save as a binary file.\nappend : Str –     Flags = fname\nAppend result to an existing file named fname instead of returning to a Julia variable.   Use the bo option to save as a binary file.\nb : binary : – Str –\n-b\nd : nodata : – Str or Number –		Flags = ionodata\nControl how user-coded missing data values are translated to official NaN values in GMT.   -d\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\ng : gaps : – Str –           Flags = axydXYDcolz+-gapu\nExamine the spacing between consecutive data points in order to impose breaks in the line.   -g\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\no : outcol : – Str –     Flags = cols\nSelect specific data columns for primary output, in arbitrary order.   -o\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.gmtconvert",
    "page": "Index",
    "title": "GMT.gmtconvert",
    "category": "function",
    "text": "gmtconvert(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nConvert, Paste, and/or Extract columns from data tables\n\nFull option list at gmtconvert\n\nParameters\n\nA : h_cat : – Str or [] –\nThe records from the input files should be pasted horizontally, not appended vertically [Default].   -A\nC : n_records : – Str –  Flags = +lmin+umax+i\nOnly output segments whose number of records matches your given criteria:   -C\nD : dump : – Str or [] –   Flags = template+oorig\nFor multiple segment data, dump each segment to a separate output file.   -D\nE : first_last : – Str or [] –   Flags = flmMstride\nOnly extract the first and last record for each segment of interest.   -E\nF : conn_method : – Str or [] –   Flags = cnrvrefpoint\nAlter the way points are connected (by specifying a scheme) and data are grouped (by specifying a method).   -F\nI : invert : – Str or [] –      Flags = tsr\nInvert the order of items, i.e., output the items in reverse order, starting with the last   and ending up with the first item.   -I\nL : list_only : – Bool or [] –\nOnly output a listing of all segment header records and no data records.   -L\nN : sort : – Str or Number –      Flags = -+col\nNumerically sort each segment based on values in column col.   -N\nQ : select_num : – Str –      Flags =  selection\nOnly write segments whose number is included in selection and skip all others.   -Q\nS : select_hdr : – Str –      Flags =  search string or regexpi\nOnly output those segments whose header record contains the specified text string.   -S\nT : **suppress ** : – Str or [] –    Flags = hd\nSuppress the writing of certain records on output. Append h to suppress segment headers   [Default] or d to suppress duplicate data records. Use T=:hd to suppress both types of records.   -T\nW : word2num : – Str or [] –      Flags =  +n\nAttempt to gmtconvert each word in the trialing text to a number and append such values   to the numerical output columns.   -W\nZ : range : – Str or [] –      Flags =  firstlast\nLimit output to the specified record range. If first is not set it defaults to record 0   (very first record) and if last is not set then it defaults to the very last record.   -Z\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nwrite : |> : Str –     Flags = fname\nSave result to ASCII file instead of returning to a Julia variable. Give file name as argument.   Use the bo option to save as a binary file.\nappend : Str –     Flags = fname\nAppend result to an existing file named fname instead of returning to a Julia variable.   Use the bo option to save as a binary file.\nb : binary : – Str –\n-b\nd : nodata : – Str or Number –		Flags = ionodata\nControl how user-coded missing data values are translated to official NaN values in GMT.   -d\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\ng : gaps : – Str –           Flags = axydXYDcolz+-gapu\nExamine the spacing between consecutive data points in order to impose breaks in the line.   -g\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\no : outcol : – Str –     Flags = cols\nSelect specific data columns for primary output, in arbitrary order.   -o\ns : skip_col : – Str –       Flags = colsar\nSuppress output for records whose z-value equals NaN.   -s\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.gmtinfo",
    "page": "Index",
    "title": "GMT.gmtinfo",
    "category": "function",
    "text": "gmtinfo(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nReads files and finds the extreme values in each of the columns.\n\nFull option list at gmtinfo\n\nParameters\n\nA : – Str –\nSpecify how the range should be reported.   -A\nC : per_column : – Bool or [] –\nReport the min/max values per column in separate columns [Default uses <min/max> format].   -C\nD : center : – Bool or [] –  \nModifies results obtained by -I by shifting the region to better align with the center of the data.   -D\nE : get_record : – Str or [] –\nReturns the record whose column col contains the minimum (l) or maximum (h) value.    -E\nF : counts : – Str or [] –\nReturns the counts of various records depending on the appended mode.   -F\nI : report_region : – Number or Str –\nReport the min/max of the first n columns to the nearest multiple of the provided increments   and output results in the form -Rw/e/s/n    -I\nL : common_limits : – Bool or [] –\nDetermines common limits across tables or segments.   -L\nS : forerrorbars : – Str or [] –\nAdd extra space for error bars. Useful together with I option and when later plotting with plot E.   -S\nT : nearest_multiple : – Number or Str –\nReport the min/max of the first (0’th) column to the nearest multiple of dz and output this as   the string -Tzmin/zmax/dz.   -T\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nwrite : |> : Str –     Flags = fname\nSave result to ASCII file instead of returning to a Julia variable. Give file name as argument.   Use the bo option to save as a binary file.\nappend : Str –     Flags = fname\nAppend result to an existing file named fname instead of returning to a Julia variable.   Use the bo option to save as a binary file.\nbi : binary_in : – Str –			Flags = ncolstypew+L+B\nSelect native binary format for primary input (secondary inputs are always ASCII).   -bi\ndi : nodata_in : – Str or Number –      Flags = nodata\nExamine all input columns and if any item equals nodata we interpret this value as a   missing data item and substitute the value NaN.   -di\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\ng : gaps : – Str –           Flags = axydXYDcolz+-gapu\nExamine the spacing between consecutive data points in order to impose breaks in the line.   -g\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\no : outcol : – Str –     Flags = cols\nSelect specific data columns for primary output, in arbitrary order.   -o\nr : reg : registration : – Bool or [] –\nForce pixel node registration [Default is gridline registration].   -r\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.gmtread-Tuple{String}",
    "page": "Index",
    "title": "GMT.gmtread",
    "category": "method",
    "text": "gmtread(fname::String, data; kwargs...)\n\nRead GMT object from file. The object is one of \"grid\" or \"grd\", \"image\" or \"img\", \"data\" or \"table\", \"cmap\" or \"cpt\" and \"ps\" (for postscript).\n\nParameters\n\nSpecify data type.  Choose among:\n\ngrd : grid : – Any –\nTell the program to load a grid.\nimg : image : – Any –\nTell the program to load an image.\ncpt : cmap : – Any –\nTell the program to load a GMT color palette.\ndataset : table : – Any –\nTell the program to load a dataset (a table of numbers).\nps : – Any –\nTell the program to load a PostScript file\ngdal : – Any –\nForce reading the file via GDAL. Should only be used to read grids.\nvarname : – String –\nWhen netCDF files have more than one 2D (or higher) variables use varname to pick the wished variable.   e.g. varname=:slp to read the variable named \'slp\'. This option defaults data type to \'grid\'\nlayer : band : – Str, Number, Array –\nWhen files are multiband or nc files with 3D or 4D arrays, we access them via these keywords.   layer=4 reads the fourth layer (or band) of the file. But the file can be a grid or an image. If it is a   grid layer can be a scalar (to read 3D arrays) or an array of two elements (to read a 4D array).   If file is an image \'layer\' can be a 1 or a 1x3 array (to read a RGB image). Not that in this later case   bands do not need to be contiguous. A band=[0,5,2] composes an RGB out of those bands. See more at   (https://gmt.soest.hawaii.edu/doc/latest/GMT_Docs.html#modifiers-for-coards-compliant-netcdf-files)\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nbi : binary_in : – Str –			Flags = ncolstypew+L+B\nSelect native binary format for primary input (secondary inputs are always ASCII).   -bi\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\n\nExample: to read a nc called \'lixo.grd\'\n\nG = gmtread(\"lixo.grd\", grd=true);\n\nto read a jpg image with the bands reversed (this example is currently broken in GMT5. Needs GMT6dev)\n\nI = gmtread(\"image.jpg\", band=[2,1,0]);\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.gmtselect",
    "page": "Index",
    "title": "GMT.gmtselect",
    "category": "function",
    "text": "gmtselect(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nSelect data table subsets based on multiple spatial criteria.\n\nFull option list at gmtselect\n\nParameters\n\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nA : area : – Str or Number –\nFeatures with an area smaller than minarea in km^2 or of hierarchical level that is   lower than minlevel or higher than max_level will not be plotted.   -A\nC : point_file : – Str –   Flags = pointfile+ddist[unit]\nPass all records whose location is within dist of any of the points in the ASCII file pointfile.   If dist is zero then the 3rd column of pointfile must have each point’s individual radius of influence.   -C\nD : res : resolution : – Str –      Flags = c|l|i|h|f\nIgnored unless N is set. Selects the resolution of the coastline data set to use   ((f)ull, (h)igh, (i)ntermediate, (l)ow, or (c)rude).   -D\nE : boundary : – Str or [] –            Flags = [fn]\nSpecify how points exactly on a polygon boundary should be considered.   -E\nF : polygon : – Str or GMTdaset oe Mx2 array –   Flags = polygonfile\nPass all records whose location is within one of the closed polygons in the multiple-segment   file polygonfile or a GMTdataset type or a Mx2 array defining the polygon.   -F\nG : gridmask : – Str or GRDgrid type –      Flags = gridmask\nPass all locations that are inside the valid data area of the grid gridmask.   Nodes that are outside are either NaN or zero.   -G\nI : reverse : – Str or [] –    Flags = [cflrsz]\nReverses the sense of the test for each of the criteria specified.   -I\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nL : dist2line : – Str –    Flags = linefile+ddist[unit][+p]\nPass all records whose location is within dist of any of the line segments in the ASCII   multiple-segment file linefile.   -L\nN : mask_geog : – List or Str –     Flags = ocean/land/lake/island/pond or wet/dry\nPass all records whose location is inside specified geographical features.   -N\nZ : in_range : – List or Str –     Flags = min[/max][+a][+ccol][+i]\nPass all records whose 3rd column (z; col = 2) lies within the given range or is NaN.   -Z\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nwrite : |> : Str –     Flags = fname\nSave result to ASCII file instead of returning to a Julia variable. Give file name as argument.   Use the bo option to save as a binary file.\nappend : Str –     Flags = fname\nAppend result to an existing file named fname instead of returning to a Julia variable.   Use the bo option to save as a binary file.\nb : binary : – Str –\n-b\nd : nodata : – Str or Number –		Flags = ionodata\nControl how user-coded missing data values are translated to official NaN values in GMT.   -d\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\ng : gaps : – Str –           Flags = axydXYDcolz+-gapu\nExamine the spacing between consecutive data points in order to impose breaks in the line.   -g\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\no : outcol : – Str –     Flags = cols\nSelect specific data columns for primary output, in arbitrary order.   -o\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.gmtset",
    "page": "Index",
    "title": "GMT.gmtset",
    "category": "function",
    "text": "gmtset(cmd0::String=\"\", kwargs...)\n\nAdjust individual GMT defaults settings in the current directory’s gmt.conf file.\n\nFull option list at gmtset\n\nParameters\n\nD : units : – Str or [] –  \nModify the GMT defaults based on the system settings. Append u for US defaults or s for SI defaults.   -D\nG : defaultsfile : – Str –\nName of specific gmt.conf file to read and modify.    -G\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nwrite : |> : Str –     Flags = fname\nSave result to ASCII file instead of returning to a Julia variable. Give file name as argument.   Use the bo option to save as a binary file.\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.gmtsimplify",
    "page": "Index",
    "title": "GMT.gmtsimplify",
    "category": "function",
    "text": "gmtsimplify(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nLine reduction using the Douglas-Peucker algorithm.\n\nFull option list at gmtsimplify\n\nParameters\n\nT : tol : tolerance : – Number or Str –    Flags = tolerance[unit]\nSpecifies the maximum mismatch tolerance in the user units. If the data is not Cartesian then append the distance unit.   -T\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nwrite : |> : Str –     Flags = fname\nSave result to ASCII file instead of returning to a Julia variable. Give file name as argument.   Use the bo option to save as a binary file.\nappend : Str –     Flags = fname\nAppend result to an existing file named fname instead of returning to a Julia variable.   Use the bo option to save as a binary file.\nb : binary : – Str –\n-b\nd : nodata : – Str or Number –		Flags = ionodata\nControl how user-coded missing data values are translated to official NaN values in GMT.   -d\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\ng : gaps : – Str –           Flags = axydXYDcolz+-gapu\nExamine the spacing between consecutive data points in order to impose breaks in the line.   -g\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\no : outcol : – Str –     Flags = cols\nSelect specific data columns for primary output, in arbitrary order.   -o\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.gmtspatial",
    "page": "Index",
    "title": "GMT.gmtspatial",
    "category": "function",
    "text": "gmtspatial(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nGeospatial operations on points, lines and polygons.\n\nFull option list at gmtspatial\n\nParameters\n\nA : nn : nearest_neighbor : – Str –     Flags = [amin_dist][unit]\nPerform spatial nearest neighbor (NN) analysis: Determine the nearest neighbor of each point   and report the NN distances and the point IDs involved in each pair.   -A\nC : clip : – Bool or [] –\nClips polygons to the map region, including map boundary to the polygon as needed. The result is a closed polygon.   -C\nD : duplicates : – Str –   Flags = [+ffile][+aamax][+ddmax][+c|Ccmax][+sfact]\nCheck for duplicates among the input lines or polygons, or, if file is given via +f, check if the   input features already exist among the features in file.   -D\nE : handedness : – Str –   Flags = +|-\nReset the handedness of all polygons to match the given + (counter-clockwise) or - (clockwise). Implies Q+   -E\nF : force_polygons : – Str or [] –   Flags = [l]\nForce input data to become polygons on output, i.e., close them explicitly if not already closed.   Optionally, append l to force line geometry.   -F\nI : intersections : – Str or [] –   Flags = [e|i]\nDetermine the intersection locations between all pairs of polygons.   -I\nN : in_polyg : – Str –      Flags = pfile[+a][+pstart][+r][+z]\nDetermine if one (or all, with +a) points of each feature in the input data are inside any of   the polygons given in the pfile.   -N\nQ : areaorlength : – Str –      Flags = [[-|+]unit][+cmin[/max]][+h][+l][+p][+s[a|d]]\nMeasure the area of all polygons or length of line segments.   -Q\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nS : polyg_process : – Int –      Flags = h|i|j|s|u\nSpatial processing of polygons.   -S\nT : truncate : – Str or [] –     Flags = [clippolygon]\nTruncate polygons against the specified polygon given, possibly resulting in open polygons.   -T\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nwrite : |> : Str –     Flags = fname\nSave result to ASCII file instead of returning to a Julia variable. Give file name as argument.   Use the bo option to save as a binary file.\nappend : Str –     Flags = fname\nAppend result to an existing file named fname instead of returning to a Julia variable.   Use the bo option to save as a binary file.\nb : binary : – Str –\n-b\nd : nodata : – Str or Number –		Flags = ionodata\nControl how user-coded missing data values are translated to official NaN values in GMT.   -d\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\ng : gaps : – Str –           Flags = axydXYDcolz+-gapu\nExamine the spacing between consecutive data points in order to impose breaks in the line.   -g\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\no : outcol : – Str –     Flags = cols\nSelect specific data columns for primary output, in arbitrary order.   -o\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.gmtvector",
    "page": "Index",
    "title": "GMT.gmtvector",
    "category": "function",
    "text": "gmtvector(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nTime domain filtering of 1-D data tables.\n\nFull option list at gmtvector\n\nParameters\n\nA : single_vec : – Str –   Flags = m[conf]|vector\nSpecify a single, primary vector instead of reading tables.   -A\nC : cartesian : – Str or [] –        Flags = [i|o]\nSelect Cartesian coordinates on input and output.   -C\nE : geod2geoc : – Bool or [] –\nConvert input geographic coordinates from geodetic to geocentric and output geographic   coordinates from geocentric to geodetic.   -E\nN : normalize : – Bool or [] –\nNormalize the resultant vectors prior to reporting the output.   -N\nS : secondary_vec : – Str or List –    Flags = [vector]\nSpecify a single, secondary vector in the same format as the first vector.   -S\nT : transform : – List or Str –     Flags = a|d|D|paz|s|r[arg|R|x]\nSpecify the vector transformation of interest.   -T\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nwrite : |> : Str –     Flags = fname\nSave result to ASCII file instead of returning to a Julia variable. Give file name as argument.   Use the bo option to save as a binary file.\nappend : Str –     Flags = fname\nAppend result to an existing file named fname instead of returning to a Julia variable.   Use the bo option to save as a binary file.\nb : binary : – Str –\n-b\nd : nodata : – Str or Number –		Flags = ionodata\nControl how user-coded missing data values are translated to official NaN values in GMT.   -d\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\ng : gaps : – Str –           Flags = axydXYDcolz+-gapu\nExamine the spacing between consecutive data points in order to impose breaks in the line.   -g\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\no : outcol : – Str –     Flags = cols\nSelect specific data columns for primary output, in arbitrary order.   -o\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.gmtwhich-Tuple{String}",
    "page": "Index",
    "title": "GMT.gmtwhich",
    "category": "method",
    "text": "gmtwhich(cmd0::String; kwargs...)\n\nFind full path to specified files\n\nFull option list at gmtwhich\n\nParameters\n\nA : with_permissions : – Bool or [] –\n\nOnly consider files that the user has permission to read [Default consider all files found].\n[`-A`](http://gmt.soest.hawaii.edu/doc/latest/gmtwhich.html#a)\n\nC : confirm : – Bool or [] –\n\nInstead of reporting the paths, print the confirmation Y if the file is found and N if it is not.\n[`-C`](http://gmt.soest.hawaii.edu/doc/latest/gmtwhich.html#c)\n\nD : report_dir : – Bool or [] –\n\nInstead of reporting the paths, print the directories that contains the files.\n[`-D`](http://gmt.soest.hawaii.edu/doc/latest/gmtwhich.html#d)\n\nG : download : – Str or [] –      Flags = [c|l|u]\n\nIf a file argument is a downloadable file (either a full URL, a @file for downloading from\nthe GMT Site Cache, or @earth_relief_*.grd) we will try to download the file if it is not\nfound in your local data or cache dirs.\n[`-G`](http://gmt.soest.hawaii.edu/doc/latest/gmtwhich.html#g)\n\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.gmtwrite-Tuple{String,Any}",
    "page": "Index",
    "title": "GMT.gmtwrite",
    "category": "method",
    "text": "gmtwrite(fname::String, data; kwargs...)\n\nWrite a GMT object to file. The object is one of \"grid\" or \"grd\", \"image\" or \"img\", \"dataset\" or \"table\", \"cmap\" or \"cpt\" and \"ps\" (for postscript).\n\nWhen saving grids we have a large panoply of formats at our disposal.\n\nParameters\n\nid : – Str –  \nUse an id code when not not saving a grid into a standard COARDS-compliant netCDF grid. This id   is made up of two characters like ef to save in ESRI Arc/Info ASCII Grid Interchange format (ASCII float).   See the full list of ids at https://gmt.soest.hawaii.edu/doc/latest/grdconvert.html#format-identifier.\n-G\nscale : offset – Number –\nYou may optionally ask to scale the data and then offset them with the specified amounts.   These modifiers are particularly practical when storing the data as integers, by first removing an offset   and then scaling down the values.\nnan : novalue : invalid : missing – Number –\nLets you supply a value that represents an invalid grid entry, i.e., ‘Not-a-Number’.\ngdal : – Bool or [] –\nForce the use of the GDAL library to write the grid (to be used only with grids).   \ndriver : – Str –  \nWhen saving in other than the netCDF format we must tell the GDAL library what is wished format.   That is done by specifying the driver name used by GDAL itself (e.g., netCDF, GTiFF, etc...).\ndatatype : – Str –  		Flags = u8|u16|i16|u32|i32|float32\nWhen saving with GDAL we can specify the data type from u8|u16|i16|u32|i32|float32 where ‘i’ and ‘u’ denote   signed and unsigned integers respectively.\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nbo : binary_out : – Str –			Flags = ncolstypew+L+B\nSelect native binary output.   -bo\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\n\nExample: write the GMTgrid \'G\' object into a nc file called \'lixo.grd\'\n\ngmtwrite(\"lixo.grd\", G);\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.grd2cpt",
    "page": "Index",
    "title": "GMT.grd2cpt",
    "category": "function",
    "text": "grd2cpt(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nMake linear or histogram-equalized color palette table from grid\n\nFull option list at grd2cpt\n\nParameters\n\nA : alpha : transparency : – Str –\nSets a constant level of transparency (0-100) for all color slices.   -A\nC : color : cmap : – Str –		Flags = cpt master+izinc color1color2*color3*\nGive a CPT name or specify -Ccolor1,color2[,color3,...] to build a linear continuous CPT from those   colors automatically.   -C\nD : – Str or [] –			Flags = [i|o]\nSelect the back- and foreground colors to match the colors for lowest and highest   z-values in the output CPT.    -D\nE : nlevels : – Int or [] –		Flags = [nlevels]\nCreate a linear color table by using the grid z-range as the new limits in the CPT.   Alternatively, append nlevels and we will resample the color table into nlevels equidistant slices.   -E\nF : force_rgb : – Str or [] –		Flags = [R|r|h|c][+c]]\nForce output CPT to written with r/g/b codes, gray-scale values or color name.   -F\nG : truncate : – Str –              Flags = zlo/zhi\nTruncate the incoming CPT so that the lowest and highest z-levels are to zlo and zhi.   -G\nI : inverse : reverse : – Str –	Flags = [c][z]\nReverse the sense of color progression in the master CPT.   -I\nL : range : – Str –			Flags = minlimit/maxlimit\nLimit range of CPT to minlimit/maxlimit, and don’t count data outside this range when estimating CDF(Z).   [Default uses min and max of data.]   -L\nM : overrule_bg – Bool or [] –\nOverrule background, foreground, and NaN colors specified in the master CPT with the values of   the parameters COLORBACKGROUND, COLORFOREGROUND, and COLOR_NAN.   -M\nN : no_bg : nobg : – Bool or [] –\nDo not write out the background, foreground, and NaN-color fields.\nQ : log : – Bool or [] –\nSelects a logarithmic interpolation scheme [Default is linear].   -Q\nC : row_col : – Bool –\nReplace the x- and y-coordinates on output with the corresponding column and row numbers.   -C\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nS : steps : – Bool or [] or Str –			Flags = zstart/zstop/zinc or n\nSet steps in CPT. Calculate entries in CPT from zstart to zstop in steps of (zinc). Default   chooses arbitrary values by a crazy scheme based on equidistant values for a Gaussian CDF.   -S\nT : symetric : – Str –			Flags = -|+|_|=\nForce the color table to be symmetric about zero (from -R to +R).   -T\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nW : wrap : categorical : – Bool or Str or [] –      Flags = [w]\nDo not interpolate the input color table but pick the output colors starting at the   beginning of the color table, until colors for all intervals are assigned.   -W\nZ : continuous : – Bool or [] –\nCreates a continuous CPT [Default is discontinuous, i.e., constant colors for each interval].   -Z\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nwrite : |> : Str –     Flags = fname\nSave result to ASCII file instead of returning to a Julia variable. Give file name as argument.   Use the bo option to save as a binary file.\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.grd2kml",
    "page": "Index",
    "title": "GMT.grd2kml",
    "category": "function",
    "text": "grd2kml(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nReads a 2-D grid file and makes a quadtree of PNG images and KML wrappers for Google Earth using the selected tile size [256x256 pixels].\n\nFull option list at grd2kml\n\nParameters\n\nC : color : cmap : – Str –		Flags = cpt master+izinc color1color2*color3*\nGive a CPT name or specify -Ccolor1,color2[,color3,...] to build a linear continuous CPT from those   colors automatically.   -C\nE : url : – Str –		Flags = url`\nInstead of hosting the files locally, prepend a site URL. The top-level prefix.kml file   will then use this URL to find the other files it references.`[-E`](http://gmt.soest.hawaii.edu/doc/latest/grd2kml.html#e)\nF : filter : – Str –\nSpecifies the filter to use for the downsampling of the grid for more distant viewing.   Choose among boxcar, cosine arch, gaussian, or median [Gaussian].   -F\nH : sub_pixel : – Int –         Flags = `factor\nImprove the quality of rasterization by passing the sub-pixel smoothing factor to psconvert.   -H\nI : shade : intensity : intensfile : – Str or GMTgrid –\nGives the name of a grid file or GMTgrid with intensities in the (-1,+1) range,   or a grdgradient shading flags.   -I\nL : tile_size : – Number –			Flags = tilesize\nSets the fixed size of the image building blocks. Must be an integer that is radix 2.   Typical values are 256 or 512 [256].   -L\nN : prefix – Str –		            Flags = prefix\nSets a unique name prefixed used for the top-level KML filename and the directory where all   referenced KML files and PNG images will be written [GMT_Quadtree].   -N\nQ : nan_t : nan_alpha : – Bool or [] –\nMake grid nodes with z = NaN transparent, using the color-masking feature in PostScript Level 3.   -Q\nT : title : – Str –			        Flags = title\nSets the title of the top-level document (i.e., its description).   -T\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nwrite : |> : Str –     Flags = fname\nSave result to ASCII file instead of returning to a Julia variable. Give file name as argument.   Use the bo option to save as a binary file.\nappend : Str –     Flags = fname\nAppend result to an existing file named fname instead of returning to a Julia variable.   Use the bo option to save as a binary file.\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.grd2xyz",
    "page": "Index",
    "title": "GMT.grd2xyz",
    "category": "function",
    "text": "grd2xyz(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nReads one 2-D grid and returns xyz-triplets.\n\nFull option list at grd2xyz\n\nParameters\n\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nC : row_col : – Bool –\nReplace the x- and y-coordinates on output with the corresponding column and row numbers.   -C\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nW : weight : – Str –           Flags = [a|weight]\nWrite out x,y,z,w, where w is the supplied weight (or 1 if not supplied) [Default writes x,y,z only].   -W\nZ : flags : – Str –\nWrite a 1-column table. Output will be organized according to the specified ordering   convention contained in flags.   -Z\nwrite : |> : Str –     Flags = fname\nSave result to ASCII file instead of returning to a Julia variable. Give file name as argument.   Use the bo option to save as a binary file.\nappend : Str –     Flags = fname\nAppend result to an existing file named fname instead of returning to a Julia variable.   Use the bo option to save as a binary file.\nbo : binary_out : – Str –			Flags = ncolstypew+L+B\nSelect native binary output.   -bo\nd : nodata : – Str or Number –		Flags = ionodata\nControl how user-coded missing data values are translated to official NaN values in GMT.   -d\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\no : outcol : – Str –     Flags = cols\nSelect specific data columns for primary output, in arbitrary order.   -o\ns : skip_col : – Str –       Flags = colsar\nSuppress output for records whose z-value equals NaN.   -s\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.grdblend",
    "page": "Index",
    "title": "GMT.grdblend",
    "category": "function",
    "text": "grdblend(cmd0::String=\"\", arg1=nothing, arg2=nothing, kwargs...)\n\nReads a listing of grid files and blend parameters, or up to 2 GTMgrid types, and creates a grid by blending the other grids using cosine-taper weights.\n\nFull option list at grdblend\n\nParameters\n\nI : inc : – Str or Number –\nx_inc [and optionally y_inc] is the grid spacing.   -I\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nG : outgrid : – Str –\nOutput grid file name. Note that this is optional and to be used only when saving   the result directly on disk. Otherwise, just use the G = grdblend(....) form.   -G\nC : clobber : – Str or [] –      Flags = f|l|o|u[±]\nClobber mode: Instead of blending, simply pick the value of one of the grids that covers a node.   -C\nN : nodata : – Str or Number –\nNo data. Set nodes with no input grid to this value [Default is NaN].\n\n[`-N`](http://gmt.soest.hawaii.edu/doc/latest/grdblend.html#n)\n\nQ : headless : – Bool or [] –\nCreate plain header-less grid file (for use with external tools). Requires that the output   grid file is a native format (i.e., not netCDF). DO NOT USE WITH G.\n\n[`-Q`](http://gmt.soest.hawaii.edu/doc/latest/grdblend.html#q)\n\nW : no_blend : – Str or [] –\nDo not blend, just output the weights used for each node [Default makes the blend].   Append z to write the weight*z sum instead.\n\n[`-W`](http://gmt.soest.hawaii.edu/doc/latest/grdblend.html#w)\n\nZ : scale : – Number –\nScale output values by scale before writing to file.\n\n[`-Z`](http://gmt.soest.hawaii.edu/doc/latest/grdblend.html#z)\n\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\nn : interp : interpol : – Str –         Flags = bcln+a+bBC+c+tthreshold\nSelect grid interpolation mode by adding b for B-spline smoothing, c for bicubic interpolation,   l for bilinear interpolation, or n for nearest-neighbor value.   -n\nr : reg : registration : – Bool or [] –\nForce pixel node registration [Default is gridline registration].   -r\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.grdclip",
    "page": "Index",
    "title": "GMT.grdclip",
    "category": "function",
    "text": "grdclip(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nClip the range of grid values. will set values < low to below and/or values > high to above. You can also specify one or more intervals where all values should be set to between, or replace individual values.\n\nFull option list at grdclip\n\nParameters\n\ncmd0 – Str –\nEither the input file name or the full monolitic options string. Do not use this   when the grid (a GMTgrid type) is passed via the arg1 argument.\nG : outgrid : – Str –\nOutput grid file name. Note that this is optional and to be used only when saving   the result directly on disk. Otherwise, just use the G = grdclip(....) form.   -G\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nabove : high – Array or Str –\nTwo elements array with high and above or a string with \"high/above\".   It sets all data[i] > high to above.\nbelow : low – Array or Str –\nTwo elements array with low and below or a string with \"low/below\".   It sets all data[i] < low to below.\nbetween – Array or Str –\nThree elements array with low high and between or a string with \"low/high/between\".   It sets all data[i] >= low and <= high to between.\nold : new – Array or Str –\nTwo elements array with old and new or a string with \"old/new\".   It sets all data[i] == old to new.\nS – Str –\nCondense all replacement options above in a single string.   -S\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nExamples:\n  G=gmt(\"grdmath\", \"-R0/10/0/10 -I1 X\");\n  G2=grdclip(G, above=[5 6], low=[2 2], between=\"3/4/3.5\")\nor (note the use of -S for second on options because we can\'t repeat a kwarg name)\n  G2=grdclip(G, S=\"a5/6 -Sb2/2 -Si3/4/3.5\")\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.grdcontour",
    "page": "Index",
    "title": "GMT.grdcontour",
    "category": "function",
    "text": "grdcontour(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nReads a 2-D grid file or a GMTgrid type and produces a contour map by tracing each contour through the grid.\n\nFull option list at pscontour\n\nParameters\n\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nA : annot : – Str or Number –       Flags = [-|[+]annot_int][labelinfo]\nannot_int is annotation interval in data units; it is ignored if contour levels are given in a file.   -A\nB : axis : – Str – \nSet map boundary frame and axes attributes.   -B\nC : cont : contours : levels : – Str or Number –\nContours to be drawn.   -C\nD : dump : – Str –\nDump contours as data line segments; no plotting takes place.   -D\nF : force : – Str or [] –\nForce dumped contours to be oriented so that higher z-values are to the left (-Fl [Default]) or right.   -F\nG : labels : – Str –\nControls the placement of labels along the quoted lines.   -G\nJz : z_axis : – ::String –\nSet z-axis scaling.    -Jz\nL : range : – Str –\nLimit range: Do not draw contours for data values below low or above high.   -L\nN : fill : – Bool or [] –\nFill the area between contours using the discrete color table given by cpt.   -N\nP : portrait : –- Bool or [] –\nTell GMT to NOT draw in portriat mode (that is, make a Landscape plot)\nQ : cut : – Str or Number –\nDo not draw contours with less than cut number of points.   -Q\nS : smooth : – Number –\nUsed to resample the contour lines at roughly every (gridbox_size/smoothfactor) interval.   -S\nT : ticks : – Str –\nDraw tick marks pointing in the downward direction every gap along the innermost closed contours.   -T\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nU : stamp : – Str or Bool or [] –	Flags = [[just]/dx/dy/][c|label]\nDraw GMT time stamp logo on plot.   -U\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nW : pen : – Str or Number –\nSets the attributes for the particular line.   -W\nX : x_offset : – Str –     Flags = acfrx-shiftu\nY : y_offset : – Str –     Flags = acfry-shiftu\nShift plot origin relative to the current origin by (x-shift,y-shift) and optionally   append the length unit (c, i, or p).    -Y\nZ : scale : – Str –\nUse to subtract shift from the data and multiply the results by factor before contouring starts.   -Z\nbo : binary_out : – Str –			Flags = ncolstypew+L+B\nSelect native binary output.   -bo\ndo : nodata_out : – Str or Number –     Flags = nodata\nExamine all output columns and if any item equals NAN substitute it with   the chosen missing data value.   -do\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\np : view : perspective : – Str or List –   Flags = [x|y|z]azim[/elev[/zlevel]][+wlon0/lat0[/z0]][+vx0/y0]\nSelects perspective view and sets the azimuth and elevation of the viewpoint [180/90].   -p\nt : alpha : transparency : – Str –   Flags = transp\nSet PDF transparency level for an overlay, in (0-100] percent range. [Default is 0, i.e., opaque].   -t\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.grdcut",
    "page": "Index",
    "title": "GMT.grdcut",
    "category": "function",
    "text": "grdcut(cmd0::String=\"\", arg1=[], kwargs...)\n\nProduce a new outgrid file which is a subregion of ingrid. The subregion is specified with limits (the -R); the specified range must not exceed the range of ingrid (but see extend).\n\nFull option list at grdcut\n\nParameters\n\nG : outgrid : – Str –\nOutput grid file name. Note that this is optional and to be used only when saving   the result directly on disk. Otherwise, just use the G = grdcut(....) form.   -G\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nN : extend : – Str or [] –\nAllow grid to be extended if new region exceeds existing boundaries. Append nodata value   to initialize nodes outside current region [Default is NaN].   -N\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nS : circ_subregion : – Str –    Flags = [n]lon/lat/radius[unit]\nSpecify an origin and radius; append a distance unit and we determine the corresponding   rectangular region so that all grid nodes on or inside the circle are contained in the subset.   -S\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nZ : z_subregion : – Str –       Flags = [n|N |r][min/max]\nDetermine a new rectangular region so that all nodes outside this region are also outside   the given z-range.   -Z\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.grdedit",
    "page": "Index",
    "title": "GMT.grdedit",
    "category": "function",
    "text": "grdedit(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nReads the header information in a binary 2-D grid file and replaces the information with values provided on the command line.\n\nFull option list at grdedit\n\nParameters\n\nA : adjust : – Bool –\nIf necessary, adjust the file’s xinc, yinc to be compatible with its domain.   -A\nC : adjust : – Bool –\nClear the command history from the grid header.   -C\nD : header : – Str –    Flags = [+xxname][+yyname][+zzname][+sscale][+ooffset][+ninvalid][+ttitle][+rremark\nChange these header parameters.   -D\nE : header : – Str –    Flags = [a|h|l|r|t|v]\nTransform the grid in one of six ways and (for l|r|t) interchange the x and y information   -E\nG : outgrid : – Str –\nOutput grid file name. Note that this is optional and to be used only when saving   the result directly on disk. Otherwise, just use the G = grdedit(....) form.   -G\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nN : replace : – Str or Mx3 array –\nRead the ASCII (or binary) file table and replace the corresponding nodal values in the   grid with these x,y,z values. Alternatively, provide a Mx3 matrix with values to be changed.    -N\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nS : wrap : – Bool –\nFor global, geographical grids only. Grid values will be shifted longitudinally according to   the new borders given in limits (R option).   -S\nT : toggle : – Bool –\nMake necessary changes in the header to convert a gridline-registered grid to a pixel-registered   grid, or vice-versa.   -T\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nbi : binary_in : – Str –			Flags = ncolstypew+L+B\nSelect native binary format for primary input (secondary inputs are always ASCII).   -bi\ndi : nodata_in : – Str or Number –      Flags = nodata\nExamine all input columns and if any item equals nodata we interpret this value as a   missing data item and substitute the value NaN.   -di\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.grdfft",
    "page": "Index",
    "title": "GMT.grdfft",
    "category": "function",
    "text": "grdfft(cmd0::String=\"\", arg1=nothing, [arg2=nothing,] kwargs...)\n\nTake the 2-D forward Fast Fourier Transform and perform one or more mathematical operations in the frequency domain before transforming back to the space domain.\n\nFull option list at grdfft\n\nParameters\n\nA : azim : – Number –    Flags = azim\nTake the directional derivative in the azimuth direction measured in degrees CW from north.   -A\nC : upward : – Number –    Flags = zlevel\nUpward (for zlevel > 0) or downward (for zlevel < 0) continue the field zlevel meters.   -C\nD : dfdz : – Str or Number –		Flags = [scale|g]\nDifferentiate the field, i.e., take d(field)/dz. This is equivalent to multiplying by kr in   the frequency domain (kr is radial wave number).   -D\nE : radial_power : – Str –         Flags = [r|x|y][+w[k]][+n]\nEstimate power spectrum in the radial direction [r]. Place x or y immediately after E to   compute the spectrum in the x or y direction instead.   -E\nF : filter : – Str or List–        Flags = [r|x|y]params\nFilter the data. Place x or y immediately after -F to filter x or y direction only; default is   isotropic [r]. Choose between a cosine-tapered band-pass, a Gaussian band-pass filter, or a   Butterworth band-pass filter.   -F\nG : outgrid : table– Str –\nOutput grid file name (or table if radial_power is used). Note that this is optional and to   be used only when saving the result directly on disk. Otherwise, just use the G = grdfft(....) form.   -G\nI : integrate : – Str or Number –		Flags = [scale|g]\nIntegrate the field, i.e., compute integraloverz (field * dz). This is equivalent to divide   by kr in the frequency domain (kr is radial wave number).   -I\nN : inquire : – Str –         Flags = [a|f|m|r|s|nx/ny][+a|[+d|h|l][+e|n|m][+twidth][+v][+w[suffix]][+z[p]]\nChoose or inquire about suitable grid dimensions for FFT and set optional parameters. Control the FFT dimension:   -N\nS : scale : – Number –			Flags = scale\nMultiply each element by scale in the space domain (after the frequency domain operations).   -S\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.grdfilter",
    "page": "Index",
    "title": "GMT.grdfilter",
    "category": "function",
    "text": "grdfilter(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nFilter a grid file in the time domain using one of the selected convolution or non-convolution  isotropic or rectangular filters and compute distances using Cartesian or Spherical geometries.\n\nFull option list at grdfilter\n\nParameters\n\nF : filter : – Str –\nSets the filter type.    -F\nD : distflag : distance : – Number –\nDistance flag tells how grid (x,y) relates to filter width.\n\n[`-D`](http://gmt.soest.hawaii.edu/doc/latest/grdfilter.html#d)\n\nG : outgrid : – Str –\nOutput grid file name. Note that this is optional and to be used only when saving   the result directly on disk. Otherwise, just use the G = grdfilter(....) form.   -G\nI : inc : – Str or Number –\nx_inc [and optionally y_inc] is the grid spacing.   -I\nN : nans : – Str –\nDetermine how NaN-values in the input grid affects the filtered output. Values are i|p|r   -N\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nT : toggle : – Bool –\nToggle the node registration for the output grid so as to become the opposite of the input grid   -T\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.grdgradient",
    "page": "Index",
    "title": "GMT.grdgradient",
    "category": "function",
    "text": "grdgradient(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nCompute the directional derivative in a given direction, or to find the direction [and the magnitude] of the vector gradient of the data.\n\nFull option list at grdgradient\n\nParameters\n\nA : azim : – Str or Number –    Flags = azim[/azim2]\nAzimuthal direction for a directional derivative.    -A\nD : find_dir : – Str –      Flags = [a][c][o][n]\nFind the direction of the positive (up-slope) gradient of the data.\n\n[`-D`](http://gmt.soest.hawaii.edu/doc/latest/grdgradient.html#d)\n\nG : outgrid : – Str –\nOutput grid file name. Note that this is optional and to be used only when saving   the result directly on disk. Otherwise, just use the G = grdgradient(....) form.   -G\nE : lambert : – Str –    Flags = [m|s|p]azim/elev[+aambient][+ddiffuse][+pspecular][+sshine] \nCompute Lambertian radiance appropriate to use with grdimage and grdview.   -E\nN : norm : normalize : – Str –     Flags = [e|t][amp][+ssigma][+ooffset]\nNormalization. [Default is no normalization.] The actual gradients g are offset and scaled   to produce normalized gradients.   -N\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nS : slopegrid : – Str –\nName of output grid file with scalar magnitudes of gradient vectors. Requires D but makes G optional.   -S\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.grdhisteq",
    "page": "Index",
    "title": "GMT.grdhisteq",
    "category": "function",
    "text": "grdhisteq(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nFind the data values which divide a given grid file into patches of equal area. One common use of grdhisteq is in a kind of histogram equalization of an image.\n\nFull option list at grdhisteq\n\nParameters\n\nD : dump : – Str or [] –\nDump level information to file, or standard output if no file is provided.\n\n[`-D`](http://gmt.soest.hawaii.edu/doc/latest/grdhisteq.html#d)\n\nG : outgrid : – Str –\nOutput grid file name. Note that this is optional and to be used only when saving   the result directly on disk. Otherwise, just use the G = grdhisteq(....) form.   -G\nN : gaussian : – Number or [] –\nGaussian output.   -N\nQ : quadratic : – Bool –\nQuadratic output. Selects quadratic histogram equalization. [Default is linear].   -Q\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.grdimage",
    "page": "Index",
    "title": "GMT.grdimage",
    "category": "function",
    "text": "grdimage(cmd0::String=\"\", arg1=nothing, arg2=nothing, arg3=nothing; kwargs...)\n\nProduces a gray-shaded (or colored) map by plotting rectangles centered on each grid node and assigning them a gray-shade (or color) based on the z-value.\n\nFull option list at grdimage\n\nParameters\n\nA : img_out : image_out : – Str –\nSave an image in a raster format instead of PostScript.   -A\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nB : axis : – Str – \nSet map boundary frame and axes attributes.   -B\nC : color : cmap : – Str –		Flags = cpt master+izinc color1color2*color3*\nGive a CPT name or specify -Ccolor1,color2[,color3,...] to build a linear continuous CPT from those   colors automatically.   -C\nD : img_in : image_in : – Str or [] –\nSpecifies that the grid supplied is an image file to be read via GDAL.   -D\nE : dpi : – Int or [] –  \nSets the resolution of the projected grid that will be created.   -E\nG : – Str or Int –\n-G\nI : shade : intensity : – Str or GMTgrid –\nGives the name of a grid file or GMTgrid with intensities in the (-1,+1) range,   or a grdgradient shading flags.   -I\nM : monochrome : – Bool or [] –\nForce conversion to monochrome image using the (television) YIQ transformation.   -M\nN : noclip : – Bool or [] –\nDo not clip the image at the map boundary.   -N\nP : portrait : –- Bool or [] –\nTell GMT to NOT draw in portriat mode (that is, make a Landscape plot)\nQ : nan_t : nan_alpha : – Bool or [] –\nMake grid nodes with z = NaN transparent, using the colormasking feature in PostScript Level 3.\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nU : stamp : – Str or Bool or [] –	Flags = [[just]/dx/dy/][c|label]\nDraw GMT time stamp logo on plot.   -U\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nX : x_offset : – Str –     Flags = acfrx-shiftu\nY : y_offset : – Str –     Flags = acfry-shiftu\nShift plot origin relative to the current origin by (x-shift,y-shift) and optionally   append the length unit (c, i, or p).    -Y\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\nn : interp : interpol : – Str –         Flags = bcln+a+bBC+c+tthreshold\nSelect grid interpolation mode by adding b for B-spline smoothing, c for bicubic interpolation,   l for bilinear interpolation, or n for nearest-neighbor value.   -n\np : view : perspective : – Str or List –   Flags = [x|y|z]azim[/elev[/zlevel]][+wlon0/lat0[/z0]][+vx0/y0]\nSelects perspective view and sets the azimuth and elevation of the viewpoint [180/90].   -p\nt : alpha : transparency : – Str –   Flags = transp\nSet PDF transparency level for an overlay, in (0-100] percent range. [Default is 0, i.e., opaque].   -t\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.grdinfo",
    "page": "Index",
    "title": "GMT.grdinfo",
    "category": "function",
    "text": "grdinfo(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nReads a 2-D grid file and reports metadata and various statistics for the (x,y,z) data in the grid file\n\nFull option list at grdinfo\n\nParameters\n\nC : numeric : – Str or Number –\nFormats the report using tab-separated fields on a single line.   -C\nD : tiles : – Number or Str –  \nDivide a single grid’s domain (or the -R domain, if no grid given) into tiles of size   dx times dy (set via -I).   -D\nF : – Bool or [] –\nReport grid domain and x/y-increments in world mapping format.   -F\nI : nearest_multiple : – Number or Str –\nReport the min/max of the region to the nearest multiple of dx and dy, and output   this in the form -Rw/e/s/n    -I\nL : force_scan : – Number or Str –\nReport stats after actually scanning the data.   -L\nM : zmin_max : – Bool or [] –\nFind and report the location of min/max z-values.   -M\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nT : nan_t : – Number or Str –   Determine min and max z-value.   -T\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.grdlandmask",
    "page": "Index",
    "title": "GMT.grdlandmask",
    "category": "function",
    "text": "grdlandmask(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nReads the selected shoreline database and uses that information to decide which nodes in the specified grid are over land or over water.\n\nFull option list at grdlandmask\n\nParameters\n\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nI : inc : – Str or Number –\nx_inc [and optionally y_inc] is the grid spacing.   -I\nA : area : – Str or Number –\nFeatures with an area smaller than minarea in km^2 or of   hierarchical level that is lower than minlevel or higher than   max_level will not be plotted.   -A\nD : res : resolution : – Str –\nSelects the resolution of the data set to use ((f)ull, (h)igh, (i)ntermediate, (l)ow, and (c)rude).   -D\nE : bordervalues : – Str or List –    Flags = cborder/lborder/iborder/pborder or bordervalue\nNodes that fall exactly on a polygon boundary should be considered to be outside the polygon   [Default considers them to be inside].   -E\nG : outgrid : – Str –\nOutput grid file name. Note that this is optional and to be used only when saving   the result directly on disk. Otherwise, just use the G = grdlandmask(....) form.   -G\nN : mask_geog : – Str or List –    Flags = wet/dry or ocean/land/lake/island/pond\nSets the values that will be assigned to nodes. Values can be any number, including the textstring NaN   -N\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nr : reg : registration : – Bool or [] –\nForce pixel node registration [Default is gridline registration].   -r\nx : cores : n_threads : – Str or Number –  Flags = -n\nLimit the number of cores to be used in any OpenMP-enabled multi-threaded algorithms.   -x\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.grdpaste",
    "page": "Index",
    "title": "GMT.grdpaste",
    "category": "function",
    "text": "grdpaste(cmd0::String=\"\", arg1=nothing, arg2=nothing, kwargs...)\n\nCombine grids grid1 and grid2 into grid3 by pasting them together along their common edge. Both grids must have the same dx, dy and have one edge in common.\n\nFull option list at grdpaste\n\nParameters\n\nG : outgrid : – Str –\nOutput grid file name. Note that this is optional and to be used only when saving   the result directly on disk. Otherwise, just use the G = grdpaste(....) form.   -G\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.grdproject",
    "page": "Index",
    "title": "GMT.grdproject",
    "category": "function",
    "text": "grdproject(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nProject a geographical gridded data set onto a rectangular grid or do the inverse projection.\n\nFull option list at grdproject\n\nParameters\n\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nC : center : – Str or [] –      Flags = [dx/dy]\nLet projected coordinates be relative to projection center [Default is relative to lower left corner].   -C\nD : inc : – Str or number –     Flags = xinc[unit][+e|n][/yinc[unit][+e|n]]\nSet the grid spacing for the new grid. Append m for arc minute, s for arc second.   -D\nE : dpi : – Number –\nSet the resolution for the new grid in dots per inch.   -E\nF : one2one : – Str –           Flags = [c|i|p|e|f|k|M|n|u]\nForce 1:1 scaling, i.e., output (or input, see -I) data are in actual projected meters [e].   -F\nG : outgrid : – Str –\nOutput grid file name. Note that this is optional and to be used only when saving   the result directly on disk. Otherwise, just use the G = grdproject(....) form.   -G\nI : inverse : – Bool –\nDo the Inverse transformation, from rectangular to geographical.   -I\nM : projected_unit : – Str –    Flags = c|i|p\nAppend c, i, or p to indicate that cm, inch, or point should be the projected measure unit.   -M\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nn : interp : interpol : – Str –         Flags = bcln+a+bBC+c+tthreshold\nSelect grid interpolation mode by adding b for B-spline smoothing, c for bicubic interpolation,   l for bilinear interpolation, or n for nearest-neighbor value.   -n\nr : reg : registration : – Bool or [] –\nForce pixel node registration [Default is gridline registration].   -r\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.grdsample",
    "page": "Index",
    "title": "GMT.grdsample",
    "category": "function",
    "text": "grdsample(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nReads a grid file and interpolates it to create a new grid file with either: a different registration; or a new grid-spacing or number of nodes, and perhaps also a new sub-region\n\nFull option list at grdsample\n\nParameters\n\nG : outgrid : – Str –\nOutput grid file name. Note that this is optional and to be used only when saving   the result directly on disk. Otherwise, just use the G = grdsample(....) form.   -G\nI : inc : – Str or Number –\nx_inc [and optionally y_inc] is the grid spacing.   -I\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nT : toggle : – Bool –\nToggle the node registration for the output grid so as to become the opposite of the input grid   -T\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\nn : interp : interpol : – Str –         Flags = bcln+a+bBC+c+tthreshold\nSelect grid interpolation mode by adding b for B-spline smoothing, c for bicubic interpolation,   l for bilinear interpolation, or n for nearest-neighbor value.   -n\nr : reg : registration : – Bool or [] –\nForce pixel node registration [Default is gridline registration].   -r\nx : cores : n_threads : – Str or Number –  Flags = -n\nLimit the number of cores to be used in any OpenMP-enabled multi-threaded algorithms.   -x\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.grdtrack",
    "page": "Index",
    "title": "GMT.grdtrack",
    "category": "function",
    "text": "grdtrack(cmd0::String=\"\", arg1=nothing, arg2=nothing; kwargs...)\n\nInterpolates the grid(s) at the positions in the table and writes out the table with the interpolated values added as (one or more) new columns.\n\nFull option list at grdtrack\n\nParameters\n\nA : interp_path : – Str –\n-A\nC : equi : – Str –\n-C\nD : dfile : – Str –  \n-D\nE : by_coord : – Str –\n-E\nG : grid : – Str or GMTgrid or Tuple(GMTgrid\'s) –\n-G\nN : no_skip : – Bool or [] –\n-N\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nS : stack : – Str –\n-S\nT : radius : – Number, Str or [] –\n-T\nZ : z_only : – Bool or [] –\n-Z\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nbi : binary_in : – Str –			Flags = ncolstypew+L+B\nSelect native binary format for primary input (secondary inputs are always ASCII).   -bi\nbo : binary_out : – Str –			Flags = ncolstypew+L+B\nSelect native binary output.   -bo\ndi : nodata_in : – Str or Number –      Flags = nodata\nExamine all input columns and if any item equals nodata we interpret this value as a   missing data item and substitute the value NaN.   -di\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\ng : gaps : – Str –           Flags = axydXYDcolz+-gapu\nExamine the spacing between consecutive data points in order to impose breaks in the line.   -g\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\nn : interp : interpol : – Str –         Flags = bcln+a+bBC+c+tthreshold\nSelect grid interpolation mode by adding b for B-spline smoothing, c for bicubic interpolation,   l for bilinear interpolation, or n for nearest-neighbor value.   -n\no : outcol : – Str –     Flags = cols\nSelect specific data columns for primary output, in arbitrary order.   -o\ns : skip_col : – Str –       Flags = colsar\nSuppress output for records whose z-value equals NaN.   -s\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\nWhen using two numeric inputs and no G option, the order of the x,y and grid is not important. That is, both of this will work: D = grdtrack([0 0], G);  or  D = grdtrack(G, [0 0]); \n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.grdtrend",
    "page": "Index",
    "title": "GMT.grdtrend",
    "category": "function",
    "text": "grdtrend(cmd0::String=\"\", arg1=nothing, arg2=nothing; kwargs...)\n\nreads a 2-D grid file and fits a low-order polynomial trend to these data by [optionally weighted] least-squares.\n\nFull option list at grdtrend\n\nParameters\n\nN : model : – Str or Number –\nSets the number of model parameters to fit.   -N\nD : diff : – Str or [] –\nCompute the difference (input data - trend). Optionaly provide a file name to save result on disk.   -D\nT : trend : – Str or [] –\nCompute the trend surface. Optionaly provide a file name to save result on disk.   -T\nW : weights : – Str –\nIf weight.nc exists, it will be read and used to solve a weighted least-squares problem.   -W\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.grdvector",
    "page": "Index",
    "title": "GMT.grdvector",
    "category": "function",
    "text": "grdvector(cmd0::String=\"\", arg1=nothing, arg2=nothing, kwargs...)\n\nTakes two 2-D grid files which represents the x- and y-components of a vector field and produces a vector field plot by drawing vectors with orientation and length according to the information in the files. Alternatively, polar coordinate r, theta grids may be given instead.\n\nFull option list at grdvector\n\nParameters\n\nA : polar : – Bool or [] –  \nThe grid contain polar (r, theta) components instead of Cartesian (x, y) [Default is Cartesian components].   -A\nB : axis : – Str – \nSet map boundary frame and axes attributes.   -B\nG : fill : – Str or Number –\nSets color or shade for vector interiors [Default is no fill].   -G\nI : inc : – Sytr or Number –	Flags=[x]dx[/dy]\nOnly plot vectors at nodes every xinc, yinc apart (must be multiples of original grid spacing).   -I\nN : noclip : no_clip : – Bool or [] –\nDo NOT clip symbols that fall outside map border    -N\nQ : vec : vector : arrow : – Str –\nModify vector parameters. For vector heads, append vector head size [Default is 0, i.e., stick-plot].   -Q\nP : portrait : –- Bool or [] –\nTell GMT to NOT draw in portriat mode (that is, make a Landscape plot)\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nS : scale : – Str or Number –		Flags = [i|l]scale[unit]`\nSets scale for vector plot length in data units per plot distance measurement unit [1].   -S\nT : – Bool or [] –\nMeans the azimuths of Cartesian data sets should be adjusted according to the signs of the   scales in the x- and y-directions [Leave alone].   -T\nU : stamp : – Str or Bool or [] –	Flags = [[just]/dx/dy/][c|label]\nDraw GMT time stamp logo on plot.   -U\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nW : pen : – Str or Number –\nSets the attributes for the particular line.   -W\nX : x_offset : – Str –     Flags = acfrx-shiftu\nY : y_offset : – Str –     Flags = acfry-shiftu\nShift plot origin relative to the current origin by (x-shift,y-shift) and optionally   append the length unit (c, i, or p).    -Y\nZ : azimuth : – [] or Bool –\nThe theta grid provided contains azimuths rather than directions (implies -A).   -Z\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.grdview",
    "page": "Index",
    "title": "GMT.grdview",
    "category": "function",
    "text": "grdview(cmd0::String=\"\", arg1=nothing, arg2=nothing, arg3=nothing; kwargs...)\n\nReads a 2-D grid and produces a 3-D perspective plot by drawing a mesh, painting a colored/grayshaded surface made up of polygons, or by scanline conversion of these polygons to a raster image.\n\nFull option list at grdview\n\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nJz : z_axis : – ::String –\nSet z-axis scaling.    -Jz\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nB : axis : – Str – \nSet map boundary frame and axes attributes.   -B\nC : color : cmap : – Str –		Flags = cpt master+izinc color1color2*color3*\nGive a CPT name or specify -Ccolor1,color2[,color3,...] to build a linear continuous CPT from those   colors automatically.   -C\nG : drapefile : – Str or GMTgrid or a Tuple with 3 GMTgrid types –\nDrape the image in drapefile on top of the relief provided by relief_file.   -G\nI : shade : intensity : intensfileintens : – Str or GMTgrid –\nGives the name of a grid file or GMTgrid with intensities in the (-1,+1) range,   or a grdgradient shading flags.   -I\nN : plane : – Str or Int –\nDraws a plane at this z-level.   -N\nP : portrait : –- Bool or [] –\nTell GMT to NOT draw in portriat mode (that is, make a Landscape plot)\nQ : surftype : surf_type : – Str or Int –\nSpecify m for mesh plot, s* for surface, **i for image.   -Q\nS : smooth : – Number –\nSmooth the contours before plotting.   -S\nT : no_interp : – Str –\nPlot image without any interpolation.   -T\nW : pens : – Str –\nDraw contour, mesh or facade. Append pen attributes.   -W\nU : stamp : – Str or Bool or [] –	Flags = [[just]/dx/dy/][c|label]\nDraw GMT time stamp logo on plot.   -U\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nX : x_offset : – Str –     Flags = acfrx-shiftu\nY : y_offset : – Str –     Flags = acfry-shiftu\nShift plot origin relative to the current origin by (x-shift,y-shift) and optionally   append the length unit (c, i, or p).    -Y\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\nn : interp : interpol : – Str –         Flags = bcln+a+bBC+c+tthreshold\nSelect grid interpolation mode by adding b for B-spline smoothing, c for bicubic interpolation,   l for bilinear interpolation, or n for nearest-neighbor value.   -n\np : view : perspective : – Str or List –   Flags = [x|y|z]azim[/elev[/zlevel]][+wlon0/lat0[/z0]][+vx0/y0]\nSelects perspective view and sets the azimuth and elevation of the viewpoint [180/90].   -p\nt : alpha : transparency : – Str –   Flags = transp\nSet PDF transparency level for an overlay, in (0-100] percent range. [Default is 0, i.e., opaque].   -t\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.grdvolume",
    "page": "Index",
    "title": "GMT.grdvolume",
    "category": "function",
    "text": "grdvolume(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nReads one 2-D grid and returns xyz-triplets.\n\nFull option list at grdvolume\n\nParameters\n\nC : contour : – Str or List –   Flags = cval or low/high/delta or rlow/high or rcval\nFind area, volume and mean height (volume/area) inside the cval contour.   -C\nL : base_level : – Number –           Flags = base\nAlso add in the volume from the level of the contour down to base [Default base is contour].   -L\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nS : unit : – Str –              Flags = e|f|k|M|n|u\nFor geographical grids, append a unit from e|f|k|M|n|u [Default is meter (e)].   -S\nT : – Str –                         Flags = [c|h]\nDetermine the single contour that maximized the average height (= volume/area).   -T\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nZ : scale : – Str or List –     Flags = fact[/shift]\nOptionally subtract shift before scaling data by fact. [Default is no scaling].   -Z\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\no : outcol : – Str –     Flags = cols\nSelect specific data columns for primary output, in arbitrary order.   -o\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.greenspline",
    "page": "Index",
    "title": "GMT.greenspline",
    "category": "function",
    "text": "greenspline(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nReads randomly-spaced (x,y,z) triples and produces a binary grid file of gridded values z(x,y) by solving:\n\n	(1 - T) * L (L (z)) + T * L (z) = 0\n\nFull option list at greenspline\n\nParameters\n\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nI : inc : – Str or Number –\nx_inc [and optionally y_inc] is the grid spacing.   -I\nA : gradient : – Str –		Flags = gradfile+f12345\nThe solution will partly be constrained by surface gradients v = v*n, where v is the   gradient magnitude and n its unit vector direction.   -A\nC : approx : approximate : – Str or Number –	Flags = nvalue+ffile\nFind an approximate surface fit: Solve the linear system for the spline coefficients by   SVD and eliminate the contribution from all eigenvalues whose ratio to the largest   eigenvalue is less than value.   -C\nG : grid : – Str or [] –\nOutput grid file name. Note that this is optional and to be used only when saving   the result directly on disk. Otherwise, just use the G = greenspline(....) form.   -G\nD : mode : – Number –\nSets the distance flag that determines how we calculate distances between data points.   -D\nE : misfit : – Str or [] –		Flags = misfitfile\nEvaluate the spline exactly at the input data locations and report statistics of   the misfit (mean, standard deviation, and rms).   -E\nL : leave_trend : – Bool or [] –\nDo not remove a linear (1-D) or planer (2-D) trend when -D selects mode 0-3.   -L\nN : nodes : – Number –			Flags = nodefile\nASCII file with coordinates of desired output locations x in the first column(s).   -N\nQ : dir_derivative : – Str –		Flags = azxyz\nRather than evaluate the surface, take the directional derivative in the az azimuth and   return the magnitude of this derivative instead.   -Q\nS : splines : – Str –				Flags = ctlrpqpars\nSelect one of six different splines. The first two are used for 1-D, 2-D, or 3-D Cartesian splines.   -S\nT : mask : – Str –					Flags = maskgrid\nFor 2-D interpolation only. Only evaluate the solution at the nodes in the maskgrid that are   not equal to NaN.   -T\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nW : uncertainties : – Str or [] –	Flags = w\n\nData one-sigma uncertainties are provided in the last column. We then compute weights that\nare inversely proportional to the uncertainties squared.\n[`-W`](http://gmt.soest.hawaii.edu/doc/latest/greenspline.html#w)\n\nb : binary : – Str –\n-b\nd : nodata : – Str or Number –		Flags = ionodata\nControl how user-coded missing data values are translated to official NaN values in GMT.   -d\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\no : outcol : – Str –     Flags = cols\nSelect specific data columns for primary output, in arbitrary order.   -o\nx : cores : n_threads : – Str or Number –  Flags = -n\nLimit the number of cores to be used in any OpenMP-enabled multi-threaded algorithms.   -x\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.histogram",
    "page": "Index",
    "title": "GMT.histogram",
    "category": "function",
    "text": "histogram(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nReads file and examines the first data column to calculate histogram parameters based on the bin-width provided.\n\nFull option list at pshistogram\n\nParameters\n\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nW : bin : width : – Number or Str –\nSets the bin width used for histogram calculations.   -W\nA : horizontal : – Bool or [] –\nPlot the histogram horizontally from x = 0 [Default is vertically from y = 0].   -A\nB : axis : – Str – \nSet map boundary frame and axes attributes.   -B\nC : color : – Str or GMTcpt –\nGive a CPT. The mid x-value for each bar is used to look-up the bar color.   -C\nD : annot : annotate : – Str or [] –\nAnnotate each bar with the count it represents.   -D\nF : center : – Bool or [] –\nCenter bin on each value. [Default is left edge].   -F\nG : fill : – Number or Str –\nSelect filling of bars [if no G, L or C set G=100].   -G\nI : inquire : – Bool or [] –\nInquire about min/max x and y after binning.   -I\nL : labels : – Str or [] –\nDraw bar outline using the specified pen thickness [if no G, L or C set L=0.5].   -L\nN : normal : – Str –\nDraw the equivalent normal distribution; append desired pen [0.5p,black].   -N\nP : portrait : –- Bool or [] –\nTell GMT to NOT draw in portriat mode (that is, make a Landscape plot)\nQ : alpha : – Number or [] –\nSets the confidence level used to determine if the mean resultant is significant.   -Q\nR : region : – Str –\nSpecifies the ‘region’ of interest in (r,azimuth) space. r0 is 0, r1 is max length in units.   -R\nS : stairs : – Str or number –\nDraws a stairs-step diagram which does not include the internal bars of the default histogram.   -S\nZ : kind : – Number or Str –\nChoose between 6 types of histograms.   -Z\nU : stamp : – Str or Bool or [] –	Flags = [[just]/dx/dy/][c|label]\nDraw GMT time stamp logo on plot.   -U\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nX : x_offset : – Str –     Flags = acfrx-shiftu\nY : y_offset : – Str –     Flags = acfry-shiftu\nShift plot origin relative to the current origin by (x-shift,y-shift) and optionally   append the length unit (c, i, or p).    -Y\nbi : binary_in : – Str –			Flags = ncolstypew+L+B\nSelect native binary format for primary input (secondary inputs are always ASCII).   -bi\ndi : nodata_in : – Str or Number –      Flags = nodata\nExamine all input columns and if any item equals nodata we interpret this value as a   missing data item and substitute the value NaN.   -di\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\np : view : perspective : – Str or List –   Flags = [x|y|z]azim[/elev[/zlevel]][+wlon0/lat0[/z0]][+vx0/y0]\nSelects perspective view and sets the azimuth and elevation of the viewpoint [180/90].   -p\nt : alpha : transparency : – Str –   Flags = transp\nSet PDF transparency level for an overlay, in (0-100] percent range. [Default is 0, i.e., opaque].   -t\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.image",
    "page": "Index",
    "title": "GMT.image",
    "category": "function",
    "text": "image(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nPlace images or EPS files on maps.\n\nFull option list at psimage\n\nParameters\n\nB : axis : – Str – \nSet map boundary frame and axes attributes.   -B\nD : ref_point : – Str –  \nSets reference point on the map for the image using one of four coordinate systems.   -D\nF : box : – Str or [] –\nWithout further options, draws a rectangular border around the image using MAPFRAMEPEN.   -F\nI : invert_1bit : – Number or Str –\nInvert 1-bit image before plotting.   -I\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nJz : z_axis : – ::String –\nSet z-axis scaling.    -Jz\nM : monochrome : – Bool or [] –\nConvert color image to monochrome grayshades using the (television) YIQ-transformation.   -M\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nU : stamp : – Str or Bool or [] –	Flags = [[just]/dx/dy/][c|label]\nDraw GMT time stamp logo on plot.   -U\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nX : x_offset : – Str –     Flags = acfrx-shiftu\nY : y_offset : – Str –     Flags = acfry-shiftu\nShift plot origin relative to the current origin by (x-shift,y-shift) and optionally   append the length unit (c, i, or p).    -Y\np : view : perspective : – Str or List –   Flags = [x|y|z]azim[/elev[/zlevel]][+wlon0/lat0[/z0]][+vx0/y0]\nSelects perspective view and sets the azimuth and elevation of the viewpoint [180/90].   -p\nt : alpha : transparency : – Str –   Flags = transp\nSet PDF transparency level for an overlay, in (0-100] percent range. [Default is 0, i.e., opaque].   -t\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.imshow-Tuple{Any}",
    "page": "Index",
    "title": "GMT.imshow",
    "category": "method",
    "text": "imshow(arg1; kw...)\n\nIs a simple front end to the grdimage program that accepts GMTgrid, GMTimage, 2D array  of floats or strings with file names of grids or images. The normal options of the grdimage program also apply here but some clever guessing of suitable necessary parameters is done if they are not provided. Contrary to other image producing modules the \"show\' keyword is not necessary to display the image. Here it is set by default. If user wants to use imshow to create layers of a more complex fig he can use show=false for the intermediate layers.\n\nExamples\n\n# Plot vertical shaded illuminated view of the Mexican hat\njulia> G = gmt(\"grdmath -R-15/15/-15/15 -I0.3 X Y HYPOT DUP 2 MUL PI MUL 8 DIV COS EXCH NEG 10 DIV EXP MUL =\");\njulia> imshow(G, axis=\"a\", shade=\"+a45\")\n\n# Plot a random heat map\njulia> imshow(rand(128,128))\n\n# Display a web downloaded jpeg image wrapped into a sinusoidal projection\njulia> imshow(\"http://larryfire.files.wordpress.com/2009/07/untooned_jessicarabbit.jpg\", region=\"d\", axis=\"g\", proj=\"I15\", img_in=\"r\", fmt=\"jpg\") \n\nSee also: grdimage\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.kml2gmt",
    "page": "Index",
    "title": "GMT.kml2gmt",
    "category": "function",
    "text": "kml2gmt(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nkml2gmt - Extract GMT table data from Google Earth KML files\n\nFull option list at kml2gmt\n\nParameters\n\nF : select : – Str –        Flags = s|l|p\nSpecify a particular feature type to output. Choose from points (s), line (l), or polygon (p).   By default we output all geometries.   -F\nZ : altitudes : – Bool or [] –\nOutput the altitude coordinates as GMT z coordinates [Default will output just longitude and latitude].   -Z\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nbo : binary_out : – Str –			Flags = ncolstypew+L+B\nSelect native binary output.   -bo\ndo : nodata_out : – Str or Number –     Flags = nodata\nExamine all output columns and if any item equals NAN substitute it with   the chosen missing data value.   -do\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.legend",
    "page": "Index",
    "title": "GMT.legend",
    "category": "function",
    "text": "legend(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nMake legends that can be overlaid on maps. It reads specific legend-related information from input or file file.\n\nFull option list at legend\n\nParameters\n\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nB : axis : – Str – \nSet map boundary frame and axes attributes.   -B\nC : clearance : – Str –\nSets the clearance between the legend frame and the internal items [4p/4p].   -C\nD : refpoint : – Str –  Flags=[g|j|J|n|x]refpoint+wwidth[/height][+jjustify][+lspacing][+odx[/dy]]\nDefines the reference point on the map for the legend using one of four coordinate systems.   -D\nF : box : – Str or number –   Flags=[+cclearances][+gfill][+i[[gap/]pen]][+p[pen]][+r[radius]][+s[[dx/dy/][shade]]]\nWithout further options, draws a rectangular border around the legend using MAPFRAMEPEN.   -F\nJz : z_axis : – ::String –\nSet z-axis scaling.    -Jz\nP : portrait : –- Bool or [] –\nTell GMT to NOT draw in portriat mode (that is, make a Landscape plot)\nU : stamp : – Str or Bool or [] –	Flags = [[just]/dx/dy/][c|label]\nDraw GMT time stamp logo on plot.   -U\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nX : x_offset : – Str –     Flags = acfrx-shiftu\nY : y_offset : – Str –     Flags = acfry-shiftu\nShift plot origin relative to the current origin by (x-shift,y-shift) and optionally   append the length unit (c, i, or p).    -Y\np : view : perspective : – Str or List –   Flags = [x|y|z]azim[/elev[/zlevel]][+wlon0/lat0[/z0]][+vx0/y0]\nSelects perspective view and sets the azimuth and elevation of the viewpoint [180/90].   -p\nt : alpha : transparency : – Str –   Flags = transp\nSet PDF transparency level for an overlay, in (0-100] percent range. [Default is 0, i.e., opaque].   -t\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.lines",
    "page": "Index",
    "title": "GMT.lines",
    "category": "function",
    "text": "lines(cmd0::String=\"\", arg1=nothing; decorated=(...), kwargs...)\n\nReads a file or (x,y) pairs and plots a collection of different line with decorations\n\nB : axis : – Str – \nSet map boundary frame and axes attributes.   -B\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nW : pen : line_attrib : – Str –\nSet pen attributes for lines or the outline of symbols   -W\n\nExample:\n\nlines([0, 10]; [0, 20], limits=(-2,12,-2,22), proj=\"M2.5\", pen=1, fill=:red,\n      decorated=(dist=(val=1,size=0.25), symbol=:box), show=true)\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.logo",
    "page": "Index",
    "title": "GMT.logo",
    "category": "function",
    "text": "logo(cmd0::String=\"\"; kwargs...)\n\nPlots the GMT logo on a map. By default, the GMT logo is 5 cm wide and 2.5 cm high and will be positioned relative to the current plot origin. Use various options to change this and to place a transparent or opaque rectangular map panel behind the GMT logo.\n\nFull option list at gmtlogo\n\nParameters\n\nD : pos : position : – Str –\nSets reference point on the map for the image using one of four coordinate systems.   -D\nF : box : – Str –\nWithout further options, draws a rectangular border around the GMT logo using MAPFRAMEPEN.   or map rose (T)   -F\njulia : – Number –\nCreate the Julia instead of the GMT logo. Provide circle diameter in centimeters\nGMTjulia : – Number –\nCreate the GMT Julia GMT logo. Provide circle diameter in centimeters\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nJz : z_axis : – ::String –\nSet z-axis scaling.    -Jz\nP : portrait : –- Bool or [] –\nTell GMT to NOT draw in portriat mode (that is, make a Landscape plot)\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nU : stamp : – Str or Bool or [] –	Flags = [[just]/dx/dy/][c|label]\nDraw GMT time stamp logo on plot.   -U\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nX : x_offset : – Str –     Flags = acfrx-shiftu\nY : y_offset : – Str –     Flags = acfry-shiftu\nShift plot origin relative to the current origin by (x-shift,y-shift) and optionally   append the length unit (c, i, or p).    -Y\nt : alpha : transparency : – Str –   Flags = transp\nSet PDF transparency level for an overlay, in (0-100] percent range. [Default is 0, i.e., opaque].   -t\nExample, make a GMT Julia logo with circles of 1 cm: logo(GMTjulia=1, show=true)\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.makecpt",
    "page": "Index",
    "title": "GMT.makecpt",
    "category": "function",
    "text": "makecpt(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nMake static color palette tables (CPTs).\n\nFull option list at makecpt\n\nA : alpha : transparency : – Str –\nSets a constant level of transparency (0-100) for all color slices.   -A\nC : color : cmap : – Str –		Flags = cpt master+izinc color1color2*color3*\nGive a CPT name or specify -Ccolor1,color2[,color3,...] to build a linear continuous CPT from those   colors automatically.   -C\nD : – Str or [] –			Flags = [i|o]\nSelect the back- and foreground colors to match the colors for lowest and highest   z-values in the output CPT.    -D\nE : data_levels : – Int or [] –		Flags = [nlevels]\nImplies reading data table(s) from file or arrays. We use the last data column to   determine the data range   -E\nF : force_rgb : – Str or [] –		Flags = [R|r|h|c][+c]]\nForce output CPT to written with r/g/b codes, gray-scale values or color name.   -F\nG : truncate : – Str –              Flags = zlo/zhi\nTruncate the incoming CPT so that the lowest and highest z-levels are to zlo and zhi.   -G\nI : inverse : reverse : – Str –	Flags = [c][z]\nReverse the sense of color progression in the master CPT.   -I\nM : overrule_bg – Bool or [] –\nOverrule background, foreground, and NaN colors specified in the master CPT with the values of   the parameters COLORBACKGROUND, COLORFOREGROUND, and COLOR_NAN.   -M\nN : no_bg : nobg : – Bool or [] –\nDo not write out the background, foreground, and NaN-color fields.\nQ : log : – Bool or [] or Str –			Flags = [i|o]\nSelects a logarithmic interpolation scheme [Default is linear].   -Q\nS : auto : – Bool or [] or Str –			Flags = [mode]\nDetermine a suitable range for the -T option from the input table(s) (or stdin).   -S\nT : range : – Str –			Flags = [min/max/inc[+b|l|n]|file|list]\nDefines the range of the new CPT by giving the lowest and highest z-value and interval.   -T\nW : wrap : categorical : – Bool or Str or [] –      Flags = [w]\nDo not interpolate the input color table but pick the output colors starting at the   beginning of the color table, until colors for all intervals are assigned.   -W\nZ : continuous : – Bool or [] –\nCreates a continuous CPT [Default is discontinuous, i.e., constant colors for each interval].   -Z\nbi : binary_in : – Str –			Flags = ncolstypew+L+B\nSelect native binary format for primary input (secondary inputs are always ASCII).   -bi\ndi : nodata_in : – Str or Number –      Flags = nodata\nExamine all input columns and if any item equals nodata we interpret this value as a   missing data item and substitute the value NaN.   -di\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.mapproject",
    "page": "Index",
    "title": "GMT.mapproject",
    "category": "function",
    "text": "mapproject(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nForward and inverse map transformations, datum conversions and geodesy.\n\nFull option list at mapproject\n\nParameters\n\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nA : origin : – Str –    Flags = b|B|f|F|o|O[lon0/lat0][+v]\nCalculate azimuth along track or to the optional fixed point set with lon0/lat0.   -A\nC : center : – Str or list or [] –    Flags = [dx/dy]\nSet center of projected coordinates to be at map projection center [Default is lower left corner].   -C\nD : override_units : – Str –    Flags = c|i|p\nTemporarily override PROJLENGTHUNIT and use c (cm), i (inch), or p (points) instead.   -D\nE : geod2ecef : – Str or [] –    Flags = [datum]\nConvert from geodetic (lon, lat, height) to Earth Centered Earth Fixed (ECEF) (x,y,z) coordinates.   -E\nF : one2one : – Str or [] –    Flags = [unit]\nForce 1:1 scaling, i.e., output (or input, see I) data are in actual projected meters.   -F\nG : track_distances : – Str or List –    Flags = [lon0/lat0][+a][+i][+u[+|-]unit][+v]\nCalculate distances along track or to the optional fixed point set with G=\"lon0/lat0\".   -G\nL : dist2line : – Str –    Flags = line.xy[+u[+|-]unit][+p]\nDetermine the shortest distance from the input data points to the line(s) given in the   ASCII multisegment file line.xy.   -L\nN : geod2aux : – Str or [] –       Flags = [a|c|g|m]\nConvert from geodetic latitudes to one of four different auxiliary latitudes (longitudes are unaffected).   -N\nQ : list : – Str or [] –           Flags = [d|e]\nList all projection parameters. To only list datums, use Q=:d, to only list ellipsoids, use Q=:e.   -Q\nS : supress : – Bool or [] –\nSuppress points that fall outside the region.   -S\nT : change_datum : – Str –    Flags = [h]from[/to]\nCoordinate conversions between datums from and to using the standard Molodensky transformation.   -T\nW : map_size : – Str or [] –    Flags = [w|h]\nPrints map width and height on standard output. No input files are read.   -W\nZ : travel_times : – Str or Number –    Flags = [speed][+a][+i][+f][+tepoch]\nCalculate travel times along track as specified with -G.   -Z\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nb : binary : – Str –\n-b\nd : nodata : – Str or Number –		Flags = ionodata\nControl how user-coded missing data values are translated to official NaN values in GMT.   -d\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\ng : gaps : – Str –           Flags = axydXYDcolz+-gapu\nExamine the spacing between consecutive data points in order to impose breaks in the line.   -g\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\no : outcol : – Str –     Flags = cols\nSelect specific data columns for primary output, in arbitrary order.   -o\np : view : perspective : – Str or List –   Flags = [x|y|z]azim[/elev[/zlevel]][+wlon0/lat0[/z0]][+vx0/y0]\nSelects perspective view and sets the azimuth and elevation of the viewpoint [180/90].   -p\ns : skip_col : – Str –       Flags = colsar\nSuppress output for records whose z-value equals NaN.   -s\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.mask",
    "page": "Index",
    "title": "GMT.mask",
    "category": "function",
    "text": "mask(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nReads (length,azimuth) pairs from file and plot a windmask diagram.\n\nFull option list at psmask\n\nParameters\n\nI : inc : – Str or Number –\nSet a fixed azimuth projection for masks [Default uses track azimuth, but see -A].   -I\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nB : axis : – Str – \nSet map boundary frame and axes attributes.   -B\nC : endclippath : – Bool or [] –\nMark end of existing clip path. No input file is needed.   -C\nD : dump : – Str –\nDump the (x,y) coordinates of each clipping polygon to one or more output files   (or stdout if template is not given).   -D\nF : oriented_polygons : – Str or [] –\nForce clip contours (polygons) to be oriented so that data points are to the left (-Fl [Default]) or right (-Fr)    -F\nG : fill : – Number or Str –\nSet fill shade, color or pattern for positive and/or negative masks [Default is no fill].   -G\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nJz : z_axis : – ::String –\nSet z-axis scaling.    -Jz\nL : node_grid : – Str –\nSave the internal grid with ones (data constraint) and zeros (no data) to the named nodegrid.   -L\nN : invert : – Bool or [] –\nInvert the sense of the test, i.e., clip regions where there is data coverage.   -N\nP : portrait : –- Bool or [] –\nTell GMT to NOT draw in portriat mode (that is, make a Landscape plot)\nQ : cut_number : – Number or Str –\nDo not dump polygons with less than cut number of points [Dumps all polygons].   -Q\nS : search_radius : – Number or Str –\nSets radius of influence. Grid nodes within radius of a data point are considered reliable.   -S\nT : tiles : – Bool or [] –\nPlot tiles instead of clip polygons. Use -G to set tile color or pattern. Cannot be used with -D.   -T\nU : stamp : – Str or Bool or [] –	Flags = [[just]/dx/dy/][c|label]\nDraw GMT time stamp logo on plot.   -U\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nX : x_offset : – Str –     Flags = acfrx-shiftu\nY : y_offset : – Str –     Flags = acfry-shiftu\nShift plot origin relative to the current origin by (x-shift,y-shift) and optionally   append the length unit (c, i, or p).    -Y\nbi : binary_in : – Str –			Flags = ncolstypew+L+B\nSelect native binary format for primary input (secondary inputs are always ASCII).   -bi\ndi : nodata_in : – Str or Number –      Flags = nodata\nExamine all input columns and if any item equals nodata we interpret this value as a   missing data item and substitute the value NaN.   -di\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\np : view : perspective : – Str or List –   Flags = [x|y|z]azim[/elev[/zlevel]][+wlon0/lat0[/z0]][+vx0/y0]\nSelects perspective view and sets the azimuth and elevation of the viewpoint [180/90].   -p\nr : reg : registration : – Bool or [] –\nForce pixel node registration [Default is gridline registration].   -r\nt : alpha : transparency : – Str –   Flags = transp\nSet PDF transparency level for an overlay, in (0-100] percent range. [Default is 0, i.e., opaque].   -t\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.mat2ds-Tuple{Any}",
    "page": "Index",
    "title": "GMT.mat2ds",
    "category": "method",
    "text": "D = mat2ds(mat; x=nothing, hdr=nothing, color=nothing) 	Take a 2D mat array and convert it into a GMTdataset. x is an optional coordinates vector (must have the 	same number of elements as rows in mat). Use x=:ny to generate a coords array 1:nrows of mat. 	hdr optional String vector with either one or nrows multisegment headers. 	color optional array with color names. Its length can be smaller than n_rows, case in which colors will be 	cycled.\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.mat2grid",
    "page": "Index",
    "title": "GMT.mat2grid",
    "category": "function",
    "text": "G = mat2grid(mat, reg=0, hdr=nothing, proj4::String=\"\", wkt::String=\"\")     Take a 2D Z array and a HDR 1x9 [xmin xmax ymin ymax zmin zmax ref xinc yinc] header descriptor     and return a grid GMTgrid type. 	Optionaly, the HDR arg may be ommited and it will computed from Z alone, but than x=1:ncol, y=1:nrow 	When HDR is not used, REG == 0 means create a grid registration grid and REG == 1, a pixel registered grid.\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.nearneighbor",
    "page": "Index",
    "title": "GMT.nearneighbor",
    "category": "function",
    "text": "nearneighbor(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nReads arbitrarily located (x,y,z[,w]) triples [quadruplets] and uses a nearest neighbor algorithm to assign an average value to each node that have one or more points within a radius centered on the node. The average value is computed as a weighted mean of the nearest point from each sector inside the search radius. The weighting function used is w(r) = 1 / (1 + d ^ 2), where d = 3 * r / search_radius and r is distance from the node. This weight is modulated by the weights of the observation points [if supplied].\n\nFull option list at nearneighbor\n\nParameters\n\nI : inc : – Str or Number –\nx_inc [and optionally y_inc] is the grid spacing.   -I\nN : sectors : – Number or Str –\nThe circular area centered on each node is divided into sectors sectors.   -N\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nS : search_radius : – Number –  \nSets the search_radius that determines which data points are considered close to a node.   -S\nE : empty : – Bool or [] –\nSet the value assigned to empty nodes when G is set [NaN].   -E\nG : outgrid : – Str –\nOutput grid file name. Note that this is optional and to be used only when saving   the result directly on disk. Otherwise, just use the G = nearneighbor(....) form.   -G\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nW : weights : – Bool or [] –\nInput data have a 4th column containing observation point weights.   -W\nbi : binary_in : – Str –			Flags = ncolstypew+L+B\nSelect native binary format for primary input (secondary inputs are always ASCII).   -bi\ndi : nodata_in : – Str or Number –      Flags = nodata\nExamine all input columns and if any item equals nodata we interpret this value as a   missing data item and substitute the value NaN.   -di\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\nn : interp : interpol : – Str –         Flags = bcln+a+bBC+c+tthreshold\nSelect grid interpolation mode by adding b for B-spline smoothing, c for bicubic interpolation,   l for bilinear interpolation, or n for nearest-neighbor value.   -n\nr : reg : registration : – Bool or [] –\nForce pixel node registration [Default is gridline registration].   -r\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.plot-Tuple{Any}",
    "page": "Index",
    "title": "GMT.plot",
    "category": "method",
    "text": "plot(arg1::Array; kwargs...)\n\nreads (x,y) pairs from files [or standard input] and generates PostScript code that will plot lines, polygons, or symbols at those locations on a map.\n\nFull option list at psxy\n\nParameters\n\nA : straight_lines : – Str –  \n\nBy default, geographic line segments are drawn as great circle arcs.\nTo draw them as straight lines, use the -A flag.\n\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nB : axis : – Str – \nSet map boundary frame and axes attributes.   -B\nC : color : cmap : – Str –		Flags = cpt master+izinc color1color2*color3*\nGive a CPT name or specify -Ccolor1,color2[,color3,...] to build a linear continuous CPT from those   colors automatically.   -C\nD : offset : – Str –\nOffset the plot symbol or line locations by the given amounts dx/dy.\nE : error_bars : – Str –\nDraw symmetrical error bars.   -E\nF : conn : connection : – Str –\nAlter the way points are connected   -F\nG : fill : markerfacecolor : MarkerFaceColor : – Str –\nSelect color or pattern for filling of symbols or polygons. BUT WARN: the alias \'fill\' will set the   color of polygons OR symbols but not the two together. If your plot has polygons and symbols, use   \'fill\' for the polygons and \'markerfacecolor\' for filling the symbols. Same applyies for W bellow   -G\nI : intens : – Str or number –\nUse the supplied intens value (in the [-1 1] range) to modulate the fill color by simulating illumination.\nL : closed_polygon : – Str –\nForce closed polygons.    -L\nN : no_clip : –- Str or [] –\nDo NOT clip symbols that fall outside map border \nP : portrait : –- Bool or [] –\nTell GMT to NOT draw in portriat mode (that is, make a Landscape plot)\nS : symbol : marker : Marker : – Str –\nPlot symbols (including vectors, pie slices, fronts, decorated or quoted lines).    -S   Alternatively select a sub-set of symbols using the aliases: marker or Marker and values:\n-, x_dash\n+, plus\na, *, star\nc, circle\nd, diamond\ng, octagon\nh, hexagon\ni, v, inverted_tri\nn, pentagon\np, ., point\nr, rectangle\ns, square\nt, ^, triangle\nx, cross\n\n+ **y**, **y_dash**\n\nand select their sizes with the **markersize** or **size** keyword [default is 7p].\nThe marker size can be a scalar or a vector with same size numeber of rows of data. Units are\npoints unless specified otherwise with (for example for cm) *par=(PROJ_LENGTH_UNIT=\"c\")*\n\nW : pen : markeredgecolor : – Str –   Set pen attributes for lines or the outline of symbols   -W   WARNING: the pen attributes will set the pen of polygons OR symbols but not the two together.   If your plot has polygons and symbols, use W or pen for the polygons and   markeredgecolor for filling the symbols. Similar to S above.\nU : stamp : – Str or Bool or [] –	Flags = [[just]/dx/dy/][c|label]\nDraw GMT time stamp logo on plot.   -U\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nX : x_offset : – Str –     Flags = acfrx-shiftu\nY : y_offset : – Str –     Flags = acfry-shiftu\nShift plot origin relative to the current origin by (x-shift,y-shift) and optionally   append the length unit (c, i, or p).    -Y\naxis : aspect : – Str –   When equal to \"equal\" makes a square plot.\na : aspatial : – Str –			Flags = col=name\nControl how aspatial data are handled in GMT during input and output.   -a\nbi : binary_in : – Str –			Flags = ncolstypew+L+B\nSelect native binary format for primary input (secondary inputs are always ASCII).   -bi\ndi : nodata_in : – Str or Number –      Flags = nodata\nExamine all input columns and if any item equals nodata we interpret this value as a   missing data item and substitute the value NaN.   -di\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\ng : gaps : – Str –           Flags = axydXYDcolz+-gapu\nExamine the spacing between consecutive data points in order to impose breaks in the line.   -g\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\np : view : perspective : – Str or List –   Flags = [x|y|z]azim[/elev[/zlevel]][+wlon0/lat0[/z0]][+vx0/y0]\nSelects perspective view and sets the azimuth and elevation of the viewpoint [180/90].   -p\nt : alpha : transparency : – Str –   Flags = transp\nSet PDF transparency level for an overlay, in (0-100] percent range. [Default is 0, i.e., opaque].   -t\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.plot3d-Tuple{Any}",
    "page": "Index",
    "title": "GMT.plot3d",
    "category": "method",
    "text": "plot3d(arg1::Array; kwargs...)\n\nreads (x,y,z) triplets from files [or standard input] and generates PostScript code that will plot lines, polygons, or symbols at those locations in 3-D.\n\nFull option list at psxyz\n\nParameters\n\nA : straight_lines : – Str –  \nBy default, geographic line segments are drawn as great circle arcs. To draw them as straight lines, use the -A flag.\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nJz : z_axis : – ::String –\nSet z-axis scaling.    -Jz\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nB : axis : – Str – \nSet map boundary frame and axes attributes.   -B\nC : color : – Str –\nGive a CPT or specify -Ccolor1,color2[,color3,...] to build a linear continuous CPT from those colors automatically.   -C\nD : offset : – Str –\nOffset the plot symbol or line locations by the given amounts dx/dy.\nE : error_bars : – Str –\nDraw symmetrical error bars.   -E\nF : conn : connection : – Str –\nAlter the way points are connected   -F\nG : fill : markerfacecolor : MarkerFaceColor : – Str –\nSelect color or pattern for filling of symbols or polygons. BUT WARN: the alias \'fill\' will set the   color of polygons OR symbols but not the two together. If your plot has polygons and symbols, use   \'fill\' for the polygons and \'markerfacecolor\' for filling the symbols. Same applyies for W bellow   -G\nI : intens : – Str or number –\nUse the supplied intens value (in the [-1 1] range) to modulate the fill color by simulating illumination.\nL : closed_polygon : – Str –\nForce closed polygons.    -L\nN : no_clip : –- Str or [] –\nDo NOT clip symbols that fall outside map border \nP : portrait : –- Bool or [] –\nTell GMT to NOT draw in portriat mode (that is, make a Landscape plot)\nS : symbol : marker : Marker : – Str –\nPlot symbols (including vectors, pie slices, fronts, decorated or quoted lines).    -S   Alternatively select a sub-set of symbols using the aliases: marker or Marker and values:\n-, x_dash\n+, plus\na, *, star\nc, circle\nd, diamond\ng, octagon\nh, hexagon\ni, v, inverted_tri\nn, pentagon\np, ., point\nr, rectangle\ns, square\nt, ^, triangle\nx, cross\ny, y_dash\nW : line_attribs : markeredgecolor : MarkerEdgeColor : – Str –   Set pen attributes for lines or the outline of symbols   -W   WARNING: the pen attributes will set the pen of polygons OR symbols but not the two together.   If your plot has polygons and symbols, use W or line_attribs for the polygons and   markeredgecolor or MarkerEdgeColor for filling the symbols. Similar to S above.\nU : stamp : – Str or Bool or [] –	Flags = [[just]/dx/dy/][c|label]\nDraw GMT time stamp logo on plot.   -U\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nX : x_offset : – Str –     Flags = acfrx-shiftu\nY : y_offset : – Str –     Flags = acfry-shiftu\nShift plot origin relative to the current origin by (x-shift,y-shift) and optionally   append the length unit (c, i, or p).    -Y\na : aspatial : – Str –			Flags = col=name\nControl how aspatial data are handled in GMT during input and output.   -a\nbi : binary_in : – Str –			Flags = ncolstypew+L+B\nSelect native binary format for primary input (secondary inputs are always ASCII).   -bi\ndi : nodata_in : – Str or Number –      Flags = nodata\nExamine all input columns and if any item equals nodata we interpret this value as a   missing data item and substitute the value NaN.   -di\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\ng : gaps : – Str –           Flags = axydXYDcolz+-gapu\nExamine the spacing between consecutive data points in order to impose breaks in the line.   -g\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\np : view : perspective : – Str or List –   Flags = [x|y|z]azim[/elev[/zlevel]][+wlon0/lat0[/z0]][+vx0/y0]\nSelects perspective view and sets the azimuth and elevation of the viewpoint [180/90].   -p\nt : alpha : transparency : – Str –   Flags = transp\nSet PDF transparency level for an overlay, in (0-100] percent range. [Default is 0, i.e., opaque].   -t\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.project",
    "page": "Index",
    "title": "GMT.project",
    "category": "function",
    "text": "project(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nProject data onto lines or great circles, generate tracks, or translate coordinates.\n\nFull option list at project\n\nParameters\n\nC : origin : – Str or list –    Flags = cx/cy\nSets the origin of the projection, in Definition 1 or 2.   -C\nA : azim : – Number –    Flags = azimuth\nDefines the azimuth of the projection (Definition 1).   -A\nE : end_point : – Str or List –    Flags = bx/by\nbx/by defines the end point of the projection path (Definition 2).   -E\nF : out_flags : – wStr –    Flags = xyzpqrs\nSpecify your desired output using any combination of xyzpqrs, in any order [Default is xyzpqrs].   -F\nG : no_input : – Str or Number –    Flags = dist[/colat][+h]\nGenerate mode. No input is read. Create (r, s, p) output points every dist units of p. See Q option.   -G\nL : length_control : – Str or list –    Flags = [w|lmin/lmax]\nLength controls. Project only those points whose p coordinate is within lmin < p < lmax.   -L\nN : flat_earth : – Bool or [] –\nFlat Earth. Make a Cartesian coordinate transformation in the plane. [Default uses spherical trigonometry.]   -N\nQ : units : – Bool or [] –\nMap type units.   -Q\nS : sort : – Bool or [] –\nSort the output into increasing p order. Useful when projecting random data into a sequential profile.   -S\nT : pole : – Str or list –    Flags = px/py\npx/py sets the position of the rotation pole of the projection. (Definition 3).   -T\nW : width_control : – Str or list –    Flags = wmin/wmax\nWidth controls. Project only those points whose q coordinate is within wmin < q < wmax.   -W\nwrite : |> : Str –     Flags = fname\nSave result to ASCII file instead of returning to a Julia variable. Give file name as argument.   Use the bo option to save as a binary file.\nappend : Str –     Flags = fname\nAppend result to an existing file named fname instead of returning to a Julia variable.   Use the bo option to save as a binary file.\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nb : binary : – Str –\n-b\nd : nodata : – Str or Number –		Flags = ionodata\nControl how user-coded missing data values are translated to official NaN values in GMT.   -d\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\ng : gaps : – Str –           Flags = axydXYDcolz+-gapu\nExamine the spacing between consecutive data points in order to impose breaks in the line.   -g\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\ns : skip_col : – Str –       Flags = colsar\nSuppress output for records whose z-value equals NaN.   -s\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.psconvert",
    "page": "Index",
    "title": "GMT.psconvert",
    "category": "function",
    "text": "psconvert(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nPlace images or EPS files on maps.\n\nFull option list at psconvert\n\nParameters\n\nA : adjust : crop : – Str or Number –  \nAdjust the BoundingBox and HiResBoundingBox to the minimum required by the image content.   -A\nC : gs_option : – Str or Array os strings –\nSpecify a single, or an araay of, custom option that will be passed on to GhostScript as is.   -C\nD : outdir*** : *outputdir : – Str –\nSets an alternative output directory (which must exist) [Default is the same directory   as the PS files].   -D\nE : dpi : – Number –\nSet raster resolution in dpi [default = 720 for PDF, 300 for others].   -E\nF : :out_name : output_name : – Str –\nForce the output file name.   -F\nG : ghost_path : – Bool or [] –\nFull path to your GhostScript executable.   -G\nI : icc_gray : – Bool or [] –\nEnforce gray-shades by using ICC profiles.   -I\nin_memory : – Bool or [] –\nProcess a in memory PS file. No other input file should be provided.   Currently works on Windows only.\nL : list_file : – Str –\nThe listfile is an ASCII file with the names of the PostScript files to be converted.   -L\nQ : anti_aliasing : – Str –\nSet the anti-aliasing options for graphics or text. Append the size of the subsample box   (1, 2, or 4) [4]. This option is set by default.   -Q\nS : gs_command : – Bool or [] –\nPrint to standard error the GhostScript command after it has been executed.   -S\nT : format : – Str –\nb|e|E|f|F|j|g|G|m|s|t Sets the output format, where b = BMP, e = EPS, E = EPS with PageSize command,   f = PDF, F = multi-page PDF, j = JPEG, g = PNG, G = transparent PNG (untouched regions are   transparent), m = PPM,  and t = TIFF [default is JPEG].   Alternatively, the format may be set with the fmt keyword, e.g. fmt=:png.   -T\nW : world_file : – Str –\nWrite a ESRI type world file suitable to make (e.g) .tif files be recognized as geotiff by   software that know how to do it.    -W\nkml – Str or [] –\nCreate a minimalist KML file that allows loading the image in GoogleEarth.   -W\nZ : delinputps : – Bool or [] –\nRemove the input PostScript file(s) after the conversion.   -Z\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.regress",
    "page": "Index",
    "title": "GMT.regress",
    "category": "function",
    "text": "regress(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nLinear regression of 1-D data sets.\n\nFull option list at regress\n\nParameters\n\nA : all_slopes : – Str or List –        Flags = min/max/inc\nInstead of determining a best-fit regression we explore the full range of regressions.   -A\nC : confidence_level : – Int –      Flags = level\nSet the confidence level (in %) to use for the optional calculation of confidence   bands on the regression [95].   -C\nE : regression_type : – Str –    Flags = x|y|o|r\nType of linear regression, i.e., select the type of misfit we should calculate.   -E\nF : column_combination : – Str –   Flags = x|y|m|l|c\nAppend a combination of the columns you wish returned;   -F\nN : norm : – Int or Str –           Flags = 1|2|r|w\nSelects the norm to use for the misfit calculation.   -N\nS : restrict : – Str or [] –        Flags = [r]\nRestricts which records will be output.   -S\nT : equi_space : – List or Str –     Flags = [min/max/]inc[+a|n]] or file|list\nEvaluate the best-fit regression model at the equidistant points implied by the arguments.   -T\nW : weighted : – Str or [] –     Flags = [w][x][y][r]\nSpecifies weighted regression and which weights will be provided.   -W\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nwrite : |> : Str –     Flags = fname\nSave result to ASCII file instead of returning to a Julia variable. Give file name as argument.   Use the bo option to save as a binary file.\nappend : Str –     Flags = fname\nAppend result to an existing file named fname instead of returning to a Julia variable.   Use the bo option to save as a binary file.\nb : binary : – Str –\n-b\nd : nodata : – Str or Number –		Flags = ionodata\nControl how user-coded missing data values are translated to official NaN values in GMT.   -d\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\ng : gaps : – Str –           Flags = axydXYDcolz+-gapu\nExamine the spacing between consecutive data points in order to impose breaks in the line.   -g\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\no : outcol : – Str –     Flags = cols\nSelect specific data columns for primary output, in arbitrary order.   -o\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.rose",
    "page": "Index",
    "title": "GMT.rose",
    "category": "function",
    "text": "rose(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nReads (length,azimuth) pairs and plot a windrose diagram.\n\nFull option list at psrose\n\nParameters\n\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nA : sector : – Str or number –\nGives the sector width in degrees for sector and rose diagram.   -A\nB : axis : – Str – \nSet map boundary frame and axes attributes.   -B\nC : color : – Str or GMTcpt –\nGive a CPT. The mid x-value for each bar is used to look-up the bar color.   -C\nE : vectors : – Str –\nPlot vectors showing the principal directions given in the mode_file file.   -E\nD : shift : – Bool or [] –\nShift sectors so that they are centered on the bin interval (e.g., first sector is centered on 0 degrees).   -D\nF : no_scale : – Bool or [] –\nDo not draw the scale length bar [Default plots scale in lower right corner].   -F\nG : fill : – Number or Str –\nSelects shade, color or pattern for filling the sectors [Default is no fill].   -G\nI : inquire : – Bool or [] –\nInquire. Computes statistics needed to specify a useful -R. No plot is generated.   -I\nL : labels : – Number or Str –\nSpecify labels for the 0, 90, 180, and 270 degree marks.   -L\nM : – Bool or [] –\nUsed with -C to modify vector parameters.   -M\nP : portrait : –- Bool or [] –\nTell GMT to NOT draw in portriat mode (that is, make a Landscape plot)\nQ : alpha : – Str or [] –\nSets the confidence level used to determine if the mean resultant is significant.   -Q\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nS : radius : – Bool or [] –\nSpecifies radius of plotted circle (append a unit from c|i|p).   -S\nT : orientation : – Bool or [] –\nSpecifies that the input data are orientation data (i.e., have a 180 degree ambiguity)   instead of true 0-360 degree directions [Default].   -T\nW : pen : – Str or tuple –\nSet pen attributes for sector outline or rose plot. [Default is no outline].   -W\nZ : scale : – Str –\nMultiply the data radii by scale.   -Z\nU : stamp : – Str or Bool or [] –	Flags = [[just]/dx/dy/][c|label]\nDraw GMT time stamp logo on plot.   -U\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nX : x_offset : – Str –     Flags = acfrx-shiftu\nY : y_offset : – Str –     Flags = acfry-shiftu\nShift plot origin relative to the current origin by (x-shift,y-shift) and optionally   append the length unit (c, i, or p).    -Y\nbi : binary_in : – Str –			Flags = ncolstypew+L+B\nSelect native binary format for primary input (secondary inputs are always ASCII).   -bi\ndi : nodata_in : – Str or Number –      Flags = nodata\nExamine all input columns and if any item equals nodata we interpret this value as a   missing data item and substitute the value NaN.   -di\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\np : view : perspective : – Str or List –   Flags = [x|y|z]azim[/elev[/zlevel]][+wlon0/lat0[/z0]][+vx0/y0]\nSelects perspective view and sets the azimuth and elevation of the viewpoint [180/90].   -p\nt : alpha : transparency : – Str –   Flags = transp\nSet PDF transparency level for an overlay, in (0-100] percent range. [Default is 0, i.e., opaque].   -t\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.sample1d",
    "page": "Index",
    "title": "GMT.sample1d",
    "category": "function",
    "text": "sample1d(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nResample 1-D table data using splines\n\nFull option list at sample1d\n\nParameters\n\nA : resamp : – Str –        Flags = f|p|m|r|R\nFor track resampling (if -T…unit is set) we can select how this is to be performed.   -A\nF : interp_type : – Str –   Flags = l|a|c|n[+1|+2]\nChoose from l (Linear), a (Akima spline), c (natural cubic spline), and n (no interpolation:   nearest point) [Default is Akima].   -F\nN : time_col : – Int –      Flags = t_col\nIndicates which column contains the independent variable (time). The left-most column   is # 0, the right-most is # (n_cols - 1). [Default is 0].   -N\nT : equi_space : – List or Str –     Flags = [min/max/]inc[+a|n]] or file|list\nEvaluate the best-fit regression model at the equidistant points implied by the arguments.   -T\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nwrite : |> : Str –     Flags = fname\nSave result to ASCII file instead of returning to a Julia variable. Give file name as argument.   Use the bo option to save as a binary file.\nappend : Str –     Flags = fname\nAppend result to an existing file named fname instead of returning to a Julia variable.   Use the bo option to save as a binary file.\nb : binary : – Str –\n-b\nd : nodata : – Str or Number –		Flags = ionodata\nControl how user-coded missing data values are translated to official NaN values in GMT.   -d\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\ng : gaps : – Str –           Flags = axydXYDcolz+-gapu\nExamine the spacing between consecutive data points in order to impose breaks in the line.   -g\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\no : outcol : – Str –     Flags = cols\nSelect specific data columns for primary output, in arbitrary order.   -o\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.scatter",
    "page": "Index",
    "title": "GMT.scatter",
    "category": "function",
    "text": "scatter(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nReads (x,y) pairs and plot symbols at those locations on a map. This module is a subset of plot to make it simpler to draw scatter plots. So many of its (fine) controling parameters are not listed here. For a finer control, user should consult the plot module.\n\nParameters\n\nG : fill : markerfacecolor : – Str –\nSelect color or pattern for filling of symbols or polygons.   -G\nN : no_clip : – Str or [] –\nDo NOT clip symbols that fall outside map border    -N\nP : portrait : –- Bool or [] –\nTell GMT to NOT draw in portriat mode (that is, make a Landscape plot)\nS : – Str –\nPlot symbols (including vectors, pie slices, fronts, decorated or quoted lines).    -S\nAlternatively select a sub-set of symbols using the aliases: symbol or marker and values:\n-, x_dash\n+, plus\na, *, star\nc, circle\nd, diamond\ng, octagon\nh, hexagon\ni, v, inverted_tri\nn, pentagon\np, ., point\nr, rectangle\ns, square\nt, ^, triangle\nx, cross\n\n+ **y**, **y_dash**\n\nand select their sizes with the **markersize** or **size** keyword [default is 8p].\nThe marker size can be a scalar or a vector with same size numeber of rows of data. Units are\npoints unless specified otherwise with (for example for cm) *par=(PROJ_LENGTH_UNIT=:c,)*\n\nW : pen : markeredgecolor : – Str –\nSet pen attributes for lines or the outline of symbols   -W\n\nFull man page GMT man page\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.solar",
    "page": "Index",
    "title": "GMT.solar",
    "category": "function",
    "text": "solar(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nCalculate and plot the day-night terminator and the civil, nautical and astronomical twilights.\n\nParameters\n\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nB : axis : – Str – \nSet map boundary frame and axes attributes.   -B\nC : format : – ::Bool –\n-C\nG : fill : – Number or Str –\n-G\nI : sun : – ::Bool or ::Tuple or ::NamedTuple –\n-I\nP : portrait : –- Bool or [] –\nTell GMT to NOT draw in portriat mode (that is, make a Landscape plot)\nM : dump : – ::Bool –\n-M\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nN : invert : – ::Bool –\n-N\nT : terminators : – ::Bool or ::Tuple or ::NamedTuple –\n-T\nW : pen : – Str or tuple –\n-W\nU : stamp : – Str or Bool or [] –	Flags = [[just]/dx/dy/][c|label]\nDraw GMT time stamp logo on plot.   -U\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nX : x_offset : – Str –     Flags = acfrx-shiftu\nY : y_offset : – Str –     Flags = acfry-shiftu\nShift plot origin relative to the current origin by (x-shift,y-shift) and optionally   append the length unit (c, i, or p).    -Y\nbo : binary_out : – Str –			Flags = ncolstypew+L+B\nSelect native binary output.   -bo\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\no : outcol : – Str –     Flags = cols\nSelect specific data columns for primary output, in arbitrary order.   -o\np : view : perspective : – Str or List –   Flags = [x|y|z]azim[/elev[/zlevel]][+wlon0/lat0[/z0]][+vx0/y0]\nSelects perspective view and sets the azimuth and elevation of the viewpoint [180/90].   -p\nt : alpha : transparency : – Str –   Flags = transp\nSet PDF transparency level for an overlay, in (0-100] percent range. [Default is 0, i.e., opaque].   -t\n\nFull man page GMT man page\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.spectrum1d",
    "page": "Index",
    "title": "GMT.spectrum1d",
    "category": "function",
    "text": "gmtspectrum1d(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nCompute auto- [and cross- ] spectra from one [or two] time-series.\n\nFull option list at spectrum1d\n\nParameters\n\nS : size : – Str –        Flags = segment_size\nsegment_size is a radix-2 number of samples per window for ensemble averaging.   -S\nC : response_fun : – Str or [] –        Flags = [xycnpago]\nRead the first two columns of input as samples of two time-series, X(t) and Y(t).   Consider Y(t) to be the output and X(t) the input in a linear system with noise.   -C\nD : sample_dist : – Number –   Flags = dt\nSet the spacing between samples in the time-series [Default = 1].   -D\nL : leave_trend : – Str or [] –     Flags = [h|m]\nLeave trend alone. By default, a linear trend will be removed prior to the transform.   -L\nN : time_col : – Int –      Flags = t_col\nIndicates which   -N\nT :  – Bool or [] –\nDisable the writing of a single composite results file to stdout.   -T\nW : wavelength : – Bool or Str –\nWrite Wavelength rather than frequency in column 1 of the output file[s] [Default = frequency, (cycles / dt)].   -W\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nwrite : |> : Str –     Flags = fname\nSave result to ASCII file instead of returning to a Julia variable. Give file name as argument.   Use the bo option to save as a binary file.\nappend : Str –     Flags = fname\nAppend result to an existing file named fname instead of returning to a Julia variable.   Use the bo option to save as a binary file.\nb : binary : – Str –\n-b\nd : nodata : – Str or Number –		Flags = ionodata\nControl how user-coded missing data values are translated to official NaN values in GMT.   -d\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\ng : gaps : – Str –           Flags = axydXYDcolz+-gapu\nExamine the spacing between consecutive data points in order to impose breaks in the line.   -g\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.sphdistance",
    "page": "Index",
    "title": "GMT.sphdistance",
    "category": "function",
    "text": "sphdistance(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nCreate Voronoi distance, node, or natural nearest-neighbor grid on a sphere\n\nFull option list at sphdistance\n\nParameters\n\nC : save_mem : – Bool or [] –\nFor large data sets you can save some memory (at the expense of more processing).   -C\nE : what_quantity : – Str –   Flags = d|n|z[dist]\nSpecify the quantity that should be assigned to the grid nodes.   -E\nG : outgrid : – Str –\nOutput grid file name. Note that this is optional and to be used only when saving   the result directly on disk. Otherwise, just use the G = sphdistance(....) form.   -G\nI : inc : – Str or Number –\nx_inc [and optionally y_inc] is the grid spacing.   -I\nL : dist_unit : – Str –      Flags = d|e|f|k|M|n|u\nSpecify the unit used for distance calculations.   -L\nN : nodetable : – Str –      Flags = nodetable\nRead the information pertaining to each Voronoi polygon (the unique node lon, lat and polygon area)   from a separate file.   -N\nQ : voronoi_polyg : – Str –     Flags = voronoifile\nAppend the name of a file with pre-calculated Voronoi polygons.   -Q\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nb : binary : – Str –\n-b\nd : nodata : – Str or Number –		Flags = ionodata\nControl how user-coded missing data values are translated to official NaN values in GMT.   -d\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\nr : reg : registration : – Bool or [] –\nForce pixel node registration [Default is gridline registration].   -r\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.sphinterpolate",
    "page": "Index",
    "title": "GMT.sphinterpolate",
    "category": "function",
    "text": "sphinterpolate(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nSpherical gridding in tension of data on a sphere\n\nFull option list at sphinterpolate\n\nParameters\n\nG : outgrid : – Str –\nOutput grid file name. Note that this is optional and to be used only when saving   the result directly on disk. Otherwise, just use the G = sphinterpolate(....) form.   -G\nI : inc : – Str or Number –\nx_inc [and optionally y_inc] is the grid spacing.   -I\nQ : tension : – Number or Str –     Flags = mode[/options]\nSpecify one of four ways to calculate tension factors to preserve local shape properties or satisfy arc constraints.   -Q\nT : var_tension : – Bool or Str –\nUse variable tension (ignored with -Q0 [constant]   -T\nZ : scale : – Bool or Str –\nBefore interpolation, scale data by the maximum data range [no scaling].   -Z\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nbi : binary_in : – Str –			Flags = ncolstypew+L+B\nSelect native binary format for primary input (secondary inputs are always ASCII).   -bi\ndi : nodata_in : – Str or Number –      Flags = nodata\nExamine all input columns and if any item equals nodata we interpret this value as a   missing data item and substitute the value NaN.   -di\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\nr : reg : registration : – Bool or [] –\nForce pixel node registration [Default is gridline registration].   -r\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.sphtriangulate",
    "page": "Index",
    "title": "GMT.sphtriangulate",
    "category": "function",
    "text": "sphtriangulate(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nDelaunay or Voronoi construction of spherical lon,lat data\n\nFull option list at sphtriangulate\n\nParameters\n\nA : area : – Bool or [] –\nCompute the area of the spherical triangles (Qd) or polygons (Qv) and write the areas in the output segment headers   -A\nC : save_mem : – Bool or [] –\nFor large data sets you can save some memory (at the expense of more processing).   -C\nD : skip : – Bool or [] –\nSkip the last (repeated) input vertex at the end of a closed segment if it equals the first point in the segment.   -D\nL : unit : – Str –          Flags = e|f|k|m|n|u|d\nSpecify the unit used for distance and area calculations.   -L\nN : – Str –         Flags = nfile\nWrite the information pertaining to each polygon to a separate file.   -N\nQ : voronoi : – Str –     Flags = d|v\nAppend d for Delaunay triangles or v for Voronoi polygons [Delaunay].   -Q\nT : – Bool or Str –\nWrite the unique arcs of the construction [Default writes fillable triangles or polygons].   When used with -A we store arc length in the segment header in chosen unit.   -T\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nb : binary : – Str –\n-b\nd : nodata : – Str or Number –		Flags = ionodata\nControl how user-coded missing data values are translated to official NaN values in GMT.   -d\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.splitxyz",
    "page": "Index",
    "title": "GMT.splitxyz",
    "category": "function",
    "text": "splitxyz(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nReads a series of (x,y[,z]) records [or optionally (x,y,z,d,h)] and splits this into separate lists of (x,y[,z]) series, such that each series has a nearly constant azimuth through the x,y plane.\n\nFull option list at splitxyz\n\nParameters\n\nA : azim_tol : – Str or Array –  \nWrite out only those segments which are within +/- tolerance degrees of azimuth in heading,   measured clockwise from North, [0 - 360].   -A\nC : course_change : – Number –\nTerminate a segment when a course change exceeding course_change degrees of heading is detected.   -C\nD : min_dist : min_distance – Number –\nDo not write a segment out unless it is at least minimum_distance units long.   -D\nF : filter : – Str or Array –\nFilter the z values and/or the x,y values, assuming these are functions of d coordinate.   xyfilter and zfilter are filter widths in distance units.   -F\nQ : xyzdh : – Str –\nSpecify your desired output using any combination of xyzdh, in any order.   -Q\nS : dh : dist_head : – Bool or [] –\nBoth d and h are supplied. In this case, input contains x,y,z,d,h. [Default expects (x,y,z) input,   and d,h are computed from delta x, delta y.   -S\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nwrite : |> : Str –     Flags = fname\nSave result to ASCII file instead of returning to a Julia variable. Give file name as argument.   Use the bo option to save as a binary file.\nappend : Str –     Flags = fname\nAppend result to an existing file named fname instead of returning to a Julia variable.   Use the bo option to save as a binary file.\nbi : binary_in : – Str –			Flags = ncolstypew+L+B\nSelect native binary format for primary input (secondary inputs are always ASCII).   -bi\nbo : binary_out : – Str –			Flags = ncolstypew+L+B\nSelect native binary output.   -bo\ndi : nodata_in : – Str or Number –      Flags = nodata\nExamine all input columns and if any item equals nodata we interpret this value as a   missing data item and substitute the value NaN.   -di\ndo : nodata_out : – Str or Number –     Flags = nodata\nExamine all output columns and if any item equals NAN substitute it with   the chosen missing data value.   -do\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\ng : gaps : – Str –           Flags = axydXYDcolz+-gapu\nExamine the spacing between consecutive data points in order to impose breaks in the line.   -g\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.surface",
    "page": "Index",
    "title": "GMT.surface",
    "category": "function",
    "text": "surface(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nReads randomly-spaced (x,y,z) triples and produces a binary grid file of gridded values z(x,y) by solving:\n\n	(1 - T) * L (L (z)) + T * L (z) = 0\n\nFull option list at surface\n\nParameters\n\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nI : inc : – Str or Number –\nx_inc [and optionally y_inc] is the grid spacing.   -I\nA : aspect_ratio : – Number –\nAspect ratio. If desired, grid anisotropy can be added to the equations.   -A\nC : convergence : – Number –\nConvergence limit. Iteration is assumed to have converged when the maximum absolute change in any   grid value is less than convergence_limit.   -C\nG : outgrid : – Str –\nOutput grid file name. Note that this is optional and to be used only when saving   the result directly on disk. Otherwise, just use the G = surface(....) form.   -G\nLl : lower : – Str or Number –\nImpose limits on the output solution. lower sets the lower bound. lower can be the name of a grid   file with lower bound values, a fixed value, d to set to minimum input value,   -L\nLu : upper : – Str or Number –\n-L\nN : max_iter : – Number –\nNumber of iterations. Iteration will cease when convergencelimit is reached or when number of   iterations reaches maxiterations.   -N\nQ : suggest : – Bool –\nSuggest grid dimensions which have a highly composite greatest common factor.   -Q\nS : search_radius : – Number or Str –  \nSets the resolution of the projected grid that will be created.   -S\nT : tension : – Number or Str –\nTension factor[s]. These must be between 0 and 1.   -T\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nZ : over_relaxation : – Str or GMTgrid –\nOver-relaxation factor. This parameter is used to accelerate the convergence; it is a number between 1 and 2.   -Z\na : aspatial : – Str –			Flags = col=name\nControl how aspatial data are handled in GMT during input and output.   -a\nbi : binary_in : – Str –			Flags = ncolstypew+L+B\nSelect native binary format for primary input (secondary inputs are always ASCII).   -bi\ndi : nodata_in : – Str or Number –      Flags = nodata\nExamine all input columns and if any item equals nodata we interpret this value as a   missing data item and substitute the value NaN.   -di\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\nr : reg : registration : – Bool or [] –\nForce pixel node registration [Default is gridline registration].   -r\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.text",
    "page": "Index",
    "title": "GMT.text",
    "category": "function",
    "text": "text(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nPlots text strings of variable size, font type, and orientation. Various map projections are provided, with the option to draw and annotate the map boundaries.\n\nFull option list at pstext\n\nParameters\n\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nB : axis : – Str – \nSet map boundary frame and axes attributes.   -B\nA : azimuths : – Bool or [] –\nAngles are given as azimuths; convert them to directions using the current projection.   -A\nC : clearance : – Str –\nSets the clearance between the text and the surrounding box [15%].   -C\nD : offset : – Str –\nOffsets the text from the projected (x,y) point by dx,dy [0/0].   -D\nF : attrib : – Str or Tuple –\nSpecify up to three text attributes (font, angle, and justification).   -F\nG : fill : – Number or Str –\nSets the shade or color used for filling the text box [Default is no fill].   -G\nJz : z_axis : – ::String –\nSet z-axis scaling.    -Jz\nL : list : – Bool or [] –\nLists the font-numbers and font-names available, then exits.   -L\nN : noclip : no_clip : –- Str or [] –\nDo NOT clip text at map boundaries.   -N\nP : portrait : –- Bool or [] –\nTell GMT to NOT draw in portriat mode (that is, make a Landscape plot)\nQ : change_case : –- Str –\nChange all text to either lower or upper case.   -Q\nT : text_box : –- Str –\nSpecify the shape of the textbox when using G and/or W.   -T\nW : line_attribs : – Str –\nSets the pen used to draw a rectangle around the text string.   -W\nZ : threeD : – Str –\nFor 3-D projections: expect each item to have its own level given in the 3rd column.   -Z\nU : stamp : – Str or Bool or [] –	Flags = [[just]/dx/dy/][c|label]\nDraw GMT time stamp logo on plot.   -U\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nX : x_offset : – Str –     Flags = acfrx-shiftu\nY : y_offset : – Str –     Flags = acfry-shiftu\nShift plot origin relative to the current origin by (x-shift,y-shift) and optionally   append the length unit (c, i, or p).    -Y\na : aspatial : – Str –			Flags = col=name\nControl how aspatial data are handled in GMT during input and output.   -a\nbi : binary_in : – Str –			Flags = ncolstypew+L+B\nSelect native binary format for primary input (secondary inputs are always ASCII).   -bi\ndi : nodata_in : – Str or Number –      Flags = nodata\nExamine all input columns and if any item equals nodata we interpret this value as a   missing data item and substitute the value NaN.   -di\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\ng : gaps : – Str –           Flags = axydXYDcolz+-gapu\nExamine the spacing between consecutive data points in order to impose breaks in the line.   -g\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\np : view : perspective : – Str or List –   Flags = [x|y|z]azim[/elev[/zlevel]][+wlon0/lat0[/z0]][+vx0/y0]\nSelects perspective view and sets the azimuth and elevation of the viewpoint [180/90].   -p\nt : alpha : transparency : – Str –   Flags = transp\nSet PDF transparency level for an overlay, in (0-100] percent range. [Default is 0, i.e., opaque].   -t\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.trend1d",
    "page": "Index",
    "title": "GMT.trend1d",
    "category": "function",
    "text": "trend1d(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nFit a [weighted] [robust] polynomial/Fourier model for y = f(x) to xy[w] data.\n\nFull option list at trend1d\n\nParameters\n\nF : output : – Str –   Flags = xymrw|p|P|c\nSpecify up to five letters from the set {x y m r w} in any order to create columns of output.    -F\nN : n_model : – Str –      Flags = [p|P|f|F|c|C|s|S|x]n[,…][+llength][+oorigin][+r]\nSpecify Specify the number of terms in the model, n_model, and append +r to do a robust fit. E.g., a robust bilinear model is -N4+r.   -N\nC : condition_number : – Number –   Flags = condition_number\nSet the maximum allowed condition number for the matrix solution.   -C\nI : confidence_level : – Number or [] –   Flags = [confidence_level]\nIteratively increase the number of model parameters, starting at one, until nmodel is reachedx   or the reduction in variance of the model is not significant at the confidencelevel level.   -I\nW : weights : – Str or [] –     Flags = [+s]\nWeights are supplied in input column 3. Do a weighted least squares fit [or start with   these weights when doing the iterative robust fit].   -W\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nb : binary : – Str –\n-b\nd : nodata : – Str or Number –		Flags = ionodata\nControl how user-coded missing data values are translated to official NaN values in GMT.   -d\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.trend2d",
    "page": "Index",
    "title": "GMT.trend2d",
    "category": "function",
    "text": "trend2d(cmd0::String=\"\", arg1=nothing, kwargs...)\n\nFit a [weighted] [robust] polynomial model for z = f(x,y) to xyz[w] data.\n\nFull option list at trend2d\n\nParameters\n\nF : output : – Str –   Flags = xyzmrw|p\nSpecify up to five letters from the set {x y m r w} in any order to create columns of output.    -F\nN : n_model : – Str –      Flags = n_model[+r]\nSpecify the number of terms in the model, n_model, and append +r to do a robust fit. E.g.,   a robust bilinear model is N=\"4+r\".   -N\nC : condition_number : – Number –   Flags = condition_number\nSet the maximum allowed condition number for the matrix solution.   -C\nI : confidence_level : – Number or [] –   Flags = [confidence_level]\nIteratively increase the number of model parameters, starting at one, until nmodel is reachedx   or the reduction in variance of the model is not significant at the confidencelevel level.   -I\nW : weights : – Str or [] –     Flags = [+s]\nWeights are supplied in input column 4. Do a weighted least squares fit [or start with   these weights when doing the iterative robust fit].   -W\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nb : binary : – Str –\n-b\nd : nodata : – Str or Number –		Flags = ionodata\nControl how user-coded missing data values are translated to official NaN values in GMT.   -d\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.triangulate",
    "page": "Index",
    "title": "GMT.triangulate",
    "category": "function",
    "text": "triangulate(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nReads one or more ASCII [or binary] files (or standard input) containing x,y[,z] and performs Delaunay triangulation, i.e., it find how the points should be connected to give the most equilateral triangulation possible. \n\nFull option list at triangulate\n\nParameters\n\nC : slope_grid : – Number –\nRead a slope grid (in degrees) and compute the propagated uncertainty in the   bathymetry using the CURVE algorithm   -C\nD : derivatives : – Str –\nTake either the x- or y-derivatives of surface represented by the planar facets (only used when G is set).   -D\nE : empty : – Str or Number –\nSet the value assigned to empty nodes when G is set [NaN].   -E\nG : grid : outgrid : – Str or [] –\nUse triangulation to grid the data onto an even grid (specified with R I).   Append the name of the output grid file.   -G\nI : inc : – Str or Number –\nx_inc [and optionally y_inc] is the grid spacing.   -I\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nM : network : – Bool or [] –\nOutput triangulation network as multiple line segments separated by a segment header record.   -M\nN : ids : – Bool or [] –\nUsed in conjunction with G to also write the triplets of the ids of all the Delaunay vertices   -N\nQ : voronoi : – Str or [] –\nOutput the edges of the Voronoi cells instead [Default is Delaunay triangle edges]   -Q\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nS : triangles : – Bool or [] –  \nOutput triangles as polygon segments separated by a segment header record. Requires Delaunay triangulation.   -S\nT : edges : – Bool or [] –\nOutput edges or polygons even if gridding has been selected with the G option   -T\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nZ : xyz : triplets : – Bool or [] –\n-Z\nbi : binary_in : – Str –			Flags = ncolstypew+L+B\nSelect native binary format for primary input (secondary inputs are always ASCII).   -bi\nbo : binary_out : – Str –			Flags = ncolstypew+L+B\nSelect native binary output.   -bo\ndi : nodata_in : – Str or Number –      Flags = nodata\nExamine all input columns and if any item equals nodata we interpret this value as a   missing data item and substitute the value NaN.   -di\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\nr : reg : registration : – Bool or [] –\nForce pixel node registration [Default is gridline registration].   -r\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.wiggle",
    "page": "Index",
    "title": "GMT.wiggle",
    "category": "function",
    "text": "wiggle(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nReads (length,azimuth) pairs from file and plot a windwiggle diagram.\n\nFull option list at pswiggle\n\nParameters\n\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nZ : scale : – Number or Str –\nGives anomaly scale in data-units/distance-unit.   -Z\nA : azimuth : – Str or number –\nSets the preferred positive azimuth. Positive wiggles will “gravitate” towards that direction.   -A\nB : axis : – Str – \nSet map boundary frame and axes attributes.   -B\nC : center : – Number –\nSubtract center from the data set before plotting [0].   -C\nD : scale_bar : – Str –\nDefines the reference point on the map for the vertical scale bar using one of four coordinate systems.   -D\nF : box : – Str –\nWithout further options, draws a rectangular border around the vertical scale bar.   -F\nG : fill : – Number or Str –\nSet fill shade, color or pattern for positive and/or negative wiggles [Default is no fill].   -G\nI : fixed_azim : – Number –\nSet a fixed azimuth projection for wiggles [Default uses track azimuth, but see -A].   -I\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nJz : z_axis : – ::String –\nSet z-axis scaling.    -Jz\nP : portrait : –- Bool or [] –\nTell GMT to NOT draw in portriat mode (that is, make a Landscape plot)\nT : track : – Number or Str or Tuple or [] –\nDraw track [Default is no track]. Append pen attributes to use [Defaults: width = 0.25p, color =   black, style = solid].   -T\nW : pen : – Number or Str or tuple or [] –\nSpecify outline pen attributes [Default is no outline].   -W\nU : stamp : – Str or Bool or [] –	Flags = [[just]/dx/dy/][c|label]\nDraw GMT time stamp logo on plot.   -U\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nX : x_offset : – Str –     Flags = acfrx-shiftu\nY : y_offset : – Str –     Flags = acfry-shiftu\nShift plot origin relative to the current origin by (x-shift,y-shift) and optionally   append the length unit (c, i, or p).    -Y\nbi : binary_in : – Str –			Flags = ncolstypew+L+B\nSelect native binary format for primary input (secondary inputs are always ASCII).   -bi\ndi : nodata_in : – Str or Number –      Flags = nodata\nExamine all input columns and if any item equals nodata we interpret this value as a   missing data item and substitute the value NaN.   -di\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\np : view : perspective : – Str or List –   Flags = [x|y|z]azim[/elev[/zlevel]][+wlon0/lat0[/z0]][+vx0/y0]\nSelects perspective view and sets the azimuth and elevation of the viewpoint [180/90].   -p\nt : alpha : transparency : – Str –   Flags = transp\nSet PDF transparency level for an overlay, in (0-100] percent range. [Default is 0, i.e., opaque].   -t\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.xyz2grd",
    "page": "Index",
    "title": "GMT.xyz2grd",
    "category": "function",
    "text": "xyz2grd(cmd0::String=\"\", arg1=nothing; kwargs...)\n\nConvert data table to a grid file. \n\nFull option list at xyz2grd\n\nParameters\n\nI : inc : – Str or Number –     Flags = xinc[unit][+e|n][/yinc[unit][+e|n]]\nx_inc [and optionally y_inc] is the grid spacing.   -I\nR : region : limits : – Str or list or GMTgrid|image –		Flags = xminxmaxyminymax+r+uunit\nSpecify the region of interest. Set to data minimum BoundinBox if not provided.   -R\nA : multiple_nodes : – Str –      Flags = [d|f|l|m|n|r|S|s|u|z]\nBy default we will calculate mean values if multiple entries fall on the same node.   Use A to change this behavior.   -A\nD : header : – Str –  Flags = [+xxname][+yyname][+zzname][+sscale][+ooffset][+ninvalid][+ttitle][+rremark]\nOutput edges   -D\nG : outgrid : – Str –\nOutput grid file name. Note that this is optional and to be used only when saving   the result directly on disk. Otherwise, just use the G = grdclip(....) form.   -G\nJ : proj : – ::String –\nSelect map projection. Defaults to 12x8 cm with linear (non-projected) maps.   -J\nS : swap : – Str or [] –        Flags = [zfile]\nSwap the byte-order of the input only. No grid file is produced.   -S\nV : verbose : – Bool or Str –		Flags = level\nSelect verbosity level, which will send progress reports to stderr.   -V\nZ : flags : – Str –\nRead a 1-column table. This assumes that all the nodes are present and sorted according to specified ordering convention contained in. flags.   -Z\nbi : binary_in : – Str –			Flags = ncolstypew+L+B\nSelect native binary format for primary input (secondary inputs are always ASCII).   -bi\ndi : nodata_in : – Str or Number –      Flags = nodata\nExamine all input columns and if any item equals nodata we interpret this value as a   missing data item and substitute the value NaN.   -di\ne : pattern : – Str –        Flags = pattern  -eregexpi\nOnly accept ASCII data records that contains the specified pattern.   -e\nf : colinfo : – Str –        Flags = iocolinfo\nSpecify the data types of input and/or output columns (time or geographical data).   -f\nh : header : – Str –        Flags = ion+c+d+rremark+ttitle\nPrimary input file(s) has header record(s).   -h\ni : incol : – Str –      Flags = cols+l+sscale+ooffset\nSelect specific data columns for primary input, in arbitrary order.   -i\nr : reg : registration : – Bool or [] –\nForce pixel node registration [Default is gridline registration].   -r\nyx : Str or Bool or [] –     Flags = io\nSwap 1st and 2nd column on input and/or output.   -:\n\n\n\n\n\n"
},

{
    "location": "index.html#GMT.get_GMTversion-Tuple{Ptr{Nothing}}",
    "page": "Index",
    "title": "GMT.get_GMTversion",
    "category": "method",
    "text": "Inquire about GMT version. Will return 5.3 for all versions up to this one and the truth for rest\n\n\n\n\n\n"
},

{
    "location": "index.html#Functions-1",
    "page": "Index",
    "title": "Functions",
    "category": "section",
    "text": "Modules = [GMT]\nOrder   = [:function]"
},

]}
