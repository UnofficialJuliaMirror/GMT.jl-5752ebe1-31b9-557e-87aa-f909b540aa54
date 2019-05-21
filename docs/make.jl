using Documenter, GMT

makedocs(
	modules = [GMT],
	#format = :html,
	format = Documenter.HTML(),
	#format = Documenter.HTML(prettyurls = get(ENV, "CI", nothing) == "true"),
	sitename = "GMT",
	assets = ["assets/custom.css"],
	#assets = Documenter.HTML(assets = ["assets/custom.css"]),
	pages = Any[
		"Introduction"             => "usage.md",
		"Some examples"            => "examples.md",
		"Draw rectangles examples" => "rectangles.md",
		"Draw frames examples"     => "frames.md",
		"Map projections"          => "proj_examples.md",
		"Gallery"                  => [
			"AGU"                   => "gallery/tables.md",
			"Map projections"       => "gallery/mapprojs.md",
			"Historical collection" => "gallery/historic.md",
		],
		hide("gallery/scripts_agu/colored_bars.md"),
		hide("gallery/scripts_agu/bars_3D.md"),
		hide("gallery/scripts_agu/bars3_peaks.md"),
		hide("gallery/scripts_agu/flower.md"),
		hide("gallery/scripts_agu/snake.md"),
		hide("gallery/scripts_agu/solar.md"),
		hide("gallery/scripts_agu/scatter_cart.md"),
		hide("gallery/scripts_agu/scatter_polar.md"),
		hide("gallery/scripts_agu/histo_step.md"),
		hide("gallery/historic/ex01.md"),
		hide("gallery/historic/ex02.md"),
		hide("gallery/historic/ex03.md"),
		hide("gallery/historic/ex04.md"),
		hide("gallery/historic/ex05.md"),
		hide("gallery/historic/ex06.md"),
		hide("gallery/historic/ex07.md"),
		hide("gallery/historic/ex08.md"),
		hide("gallery/historic/ex09.md"),
		hide("gallery/historic/ex10.md"),
		hide("gallery/historic/ex11.md"),
		hide("gallery/historic/ex12.md"),
		hide("gallery/historic/ex13.md"),
		hide("gallery/historic/ex14.md"),
		hide("gallery/historic/ex15.md"),
		hide("gallery/historic/ex16.md"),
		hide("gallery/historic/ex17.md"),
		hide("gallery/historic/ex18.md"),
		hide("gallery/historic/ex19.md"),
		hide("gallery/historic/ex20.md"),
		hide("gallery/historic/ex21.md"),
		hide("gallery/historic/ex22.md"),
		hide("gallery/historic/ex23.md"),
		hide("gallery/historic/ex24.md"),
		hide("gallery/historic/ex25.md"),
		hide("gallery/historic/ex26.md"),
		hide("gallery/historic/ex27.md"),
		hide("gallery/historic/ex28.md"),
		hide("gallery/historic/ex29.md"),
		hide("gallery/historic/ex30.md"),
		hide("gallery/historic/ex32.md"),
		hide("gallery/historic/ex33.md"),
		hide("gallery/historic/ex34.md"),
		hide("gallery/historic/ex35.md"),
		hide("gallery/historic/ex36.md"),
		hide("gallery/historic/ex40.md"),
		hide("gallery/historic/ex41.md"),
		hide("gallery/historic/ex42.md"),
		hide("gallery/historic/ex43.md"),
		hide("gallery/historic/ex44.md"),
		hide("gallery/historic/ex45.md"),
		hide("gallery/historic/ex48.md"),
		hide("pens.md"),
		hide("colorbar.md"),
		hide("grdhisteq.md"),
		hide("text.md"),
		"Manual" => [
			"monolitic.md",
			"modules.md",
			"Common options"       => "common_opts.md",
			"General features" => [
				"arrows_control.md",
				"color.md",
				"decorated.md",
				"symbols.md",
			],
		],
		"Modules manuals" => [
			"arrows.md",
			"bar.md",
			"bar3.md",
			"coast.md",
			"grdcontour.md",
			"grdimage.md",
			"grdview.md",
			"lines.md",
			"scatter.md",
			"scatter3.md",
			"solar.md",
		],
		"The GMT types"            => "types.md",
		"Index"                    => "index.md",
	],
)

deploydocs(
	repo   = "github.com/GenericMappingTools/GMT.jl.git",
#	target = "build",
#	julia = "1.0.3",
#	deps   = nothing,
#	make   = nothing
)