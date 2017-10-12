using GMT
using Base.Test

# write your own tests here
@test 1 == 1
r = gmt("gmtinfo -C",ones(Float32,9,3)*5);
assert(r[1].data == [5.0 5 5 5 5 5])
#
G=gmt("grdmath -R0/10/0/10 -I1 5");
r=gmt("grdinfo -C", G);
assert(r[1].data == [0.0  10.0  0.0  10.0  5.0  5.0  1.0  1.0  11.0  11.0])
#
cpt = makecpt(range="-1/1/0.1");
assert((size(cpt.colormap,1) == 20) && (cpt.colormap[1,:] == [0.875, 0.0, 1.0]))
#
G = gmt("grdmath -R-15/15/-15/15 -I0.3 X Y HYPOT DUP 2 MUL PI MUL 8 DIV COS EXCH NEG 10 DIV EXP MUL =");
C = grdcontour(G, C="+0.7", D=[]);
assert((size(C[1].data,1) == 21) && norm(-0.6 - C[1].data[1,1]) < 1e-8)