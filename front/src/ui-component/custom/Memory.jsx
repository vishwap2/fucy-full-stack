import React from 'react';
import { Handle, Position } from 'reactflow';
import CustomHandle from '../CustomGates/CustomHandle';

export default function Memory() {
    return (
        <div>
            <CustomHandle type="target" position={Position.Top} style={{ top: '15px', opacity: 0 }} isConnectable={1} />
            <svg version="1.1" id="Layer_1" x="0px" y="0px" height='150px' width="100%" viewBox="0 0 352 368">
                <path
                    fill="#000000"
                    opacity="1.000000"
                    stroke="none"
                    d="
M176.963348,311.971375 
	C172.637619,311.962799 168.803284,312.024231 164.973312,311.922241 
	C161.604675,311.832550 160.236847,313.224762 160.293457,316.696045 
	C160.448288,326.191864 160.376465,335.692078 160.330154,345.190247 
	C160.300262,351.320343 157.446869,354.779877 152.576126,354.776733 
	C147.980484,354.773804 144.759064,350.920135 144.714539,345.107056 
	C144.644348,335.942474 144.484085,326.770081 144.783768,317.614777 
	C144.931305,313.107544 143.215591,311.847137 138.976654,311.943542 
	C129.483337,312.159302 119.980759,312.076355 110.483315,311.980591 
	C89.148193,311.765442 73.677406,296.148956 73.653069,274.896667 
	C73.647339,269.897522 73.491333,264.891815 73.698708,259.901367 
	C73.850616,256.245483 72.545921,254.849319 68.799461,254.939987 
	C59.972454,255.153610 51.137104,255.085098 42.305943,255.020172 
	C40.163094,255.004425 37.931278,254.863907 35.902397,254.247482 
	C32.256187,253.139648 30.609402,250.257477 30.771662,246.577225 
	C30.924234,243.116760 32.643406,240.485107 36.197517,239.667816 
	C38.283840,239.188065 40.475868,239.000931 42.622990,238.982010 
	C51.287510,238.905640 59.954048,238.868820 68.617729,238.980988 
	C72.079468,239.025803 73.871758,238.038589 73.710159,234.151611 
	C73.468094,228.329285 73.487663,222.483688 73.703171,216.659332 
	C73.836479,213.056366 72.268425,212.035431 68.953056,212.076126 
	C60.289417,212.182526 51.623074,212.113434 42.958298,212.049118 
	C40.970531,212.034363 38.955742,211.918503 37.004066,211.567429 
	C33.010845,210.849152 30.862549,208.240402 30.774975,204.273651 
	C30.682016,200.062943 32.930977,197.339508 37.061729,196.469925 
	C38.995480,196.062836 41.024918,195.991257 43.012321,195.978729 
	C51.677162,195.924042 60.343853,195.856537 69.006973,195.986633 
	C72.399780,196.037598 73.822548,194.868500 73.700600,191.342422 
	C73.499107,185.517059 73.471680,179.672485 73.709320,173.849823 
	C73.865395,170.025528 72.264771,168.952728 68.689499,169.025467 
	C60.027737,169.201660 51.360039,169.127655 42.695171,169.078079 
	C40.711830,169.066742 38.698608,168.910797 36.754459,168.535126 
	C32.718643,167.755249 30.737288,165.000473 30.788704,161.062515 
	C30.839870,157.143661 32.926872,154.432724 36.871037,153.594391 
	C38.806087,153.183105 40.831364,153.063858 42.817600,153.048798 
	C51.482353,152.983063 60.149292,152.905548 68.812210,153.039993 
	C72.487144,153.097015 73.848534,151.680283 73.705353,148.006729 
	C73.484863,142.349594 73.467125,136.669937 73.708496,131.014542 
	C73.870743,127.213150 72.309998,126.090675 68.720421,126.150040 
	C59.224644,126.307060 49.724483,126.225380 40.226238,126.191597 
	C37.168980,126.180710 34.200508,125.790512 32.207321,123.026337 
	C28.315313,117.628845 31.828579,110.630630 39.049259,110.274521 
	C47.860424,109.839989 56.705902,110.096939 65.536575,110.063560 
	C73.648369,110.032898 73.512474,110.035027 73.692383,101.810982 
	C73.848366,94.680580 72.919540,87.518898 74.677467,80.423500 
	C78.499756,64.995834 92.576286,53.746883 108.537735,53.660427 
	C118.869041,53.604465 129.203415,53.505451 139.531113,53.702579 
	C143.455887,53.777489 144.812881,52.424747 144.728653,48.502750 
	C144.528336,39.175594 144.646118,29.840530 144.709396,20.509161 
	C144.752289,14.181643 147.790115,10.588893 152.833115,10.703478 
	C157.862259,10.817748 160.304184,13.927970 160.328430,20.403591 
	C160.363358,29.735220 160.471008,39.069767 160.278519,48.397518 
	C160.199203,52.241203 161.439392,53.864120 165.425873,53.696152 
	C170.915176,53.464855 176.433182,53.419170 181.916885,53.709511 
	C186.212143,53.936932 187.875244,52.537373 187.750229,48.065304 
	C187.484940,38.574478 187.685089,29.070839 187.679718,19.572462 
	C187.677292,15.273367 189.367798,12.051545 193.700073,10.900274 
	C199.010635,9.489038 203.218399,13.134759 203.301392,19.312119 
	C203.431213,28.975452 203.516571,38.646145 203.267990,48.304646 
	C203.161118,52.457249 204.526627,53.827438 208.679321,53.726322 
	C218.671646,53.483009 228.674118,53.620869 238.672272,53.659222 
	C258.660126,53.735893 273.755493,68.422569 274.520905,88.270859 
	C274.739380,93.935753 275.147339,99.577484 274.487976,105.233276 
	C274.063324,108.875938 275.624847,110.194817 279.351166,110.160774 
	C289.497345,110.068085 299.659851,110.058006 309.789886,110.550148 
	C315.660980,110.835381 318.546600,115.220276 317.177734,120.528236 
	C315.983521,125.159035 312.261719,126.096901 308.249298,126.146492 
	C299.085571,126.259750 289.919556,126.180016 280.754517,126.198357 
	C274.416809,126.211044 274.486694,126.303474 274.722046,132.690826 
	C274.905731,137.676666 274.952728,142.702621 274.525452,147.664688 
	C274.187714,151.586578 275.295593,153.138794 279.355164,153.052032 
	C287.682831,152.874039 296.018555,152.969849 304.349091,153.085495 
	C306.998871,153.122284 309.739746,153.228806 312.265747,153.928543 
	C315.652832,154.866776 317.363007,157.446945 317.374390,161.067566 
	C317.385681,164.658127 315.867462,167.273697 312.367554,168.220306 
	C310.151428,168.819702 307.776215,169.027145 305.468109,169.054794 
	C297.137329,169.154572 288.797699,169.311798 280.475555,169.030472 
	C275.585785,168.865189 273.980469,170.756561 274.338593,175.477600 
	C274.677948,179.951111 274.410278,184.470505 274.413544,188.969711 
	C274.418671,195.997177 274.420074,195.995712 281.685486,195.990280 
	C290.350555,195.983780 299.016785,195.895325 307.680267,196.010696 
	C312.070160,196.069168 316.125061,197.141922 317.241638,202.239288 
	C318.470612,207.849915 315.032410,211.726044 308.266174,211.979675 
	C301.110382,212.247894 293.937805,212.091446 286.772614,212.080002 
	C274.261353,212.059998 274.261139,212.046997 274.644348,224.436752 
	C274.664948,225.102463 274.729675,225.768600 274.715546,226.433319 
	C274.449158,238.977829 274.447327,238.972748 287.122742,238.972733 
	C294.288055,238.972733 301.459106,238.818100 308.616943,239.054794 
	C315.138428,239.270432 318.663666,243.526978 317.178162,249.086029 
	C315.911713,253.825485 312.040070,254.914673 307.827667,254.974823 
	C299.164185,255.098572 290.498047,255.034561 281.832977,255.045578 
	C274.703674,255.054626 274.449707,255.291275 274.428497,262.252594 
	C274.414764,266.749969 274.136780,271.270752 274.488953,275.740723 
	C275.841766,292.911133 260.366058,311.931152 238.450272,311.943268 
	C228.618668,311.948730 218.782700,312.093811 208.957443,311.838898 
	C204.550201,311.724548 203.141113,313.297150 203.267578,317.642639 
	C203.534088,326.799835 203.382050,335.970734 203.321960,345.135468 
	C203.281616,351.289978 200.343658,354.830292 195.566727,354.698578 
	C190.720474,354.565002 187.738190,351.020050 187.692230,345.087433 
	C187.625107,336.422729 187.677948,327.757141 187.669067,319.091949 
	C187.661804,311.991150 187.654968,311.990295 180.452042,311.962158 
	C179.453613,311.958252 178.455124,311.967346 176.963348,311.971375 
M186.500000,69.200493 
	C161.167358,69.207031 135.834503,69.157478 110.502136,69.243782 
	C97.847359,69.286903 89.326439,77.591095 89.309395,90.172020 
	C89.225616,152.004028 89.222282,213.836273 89.308105,275.668274 
	C89.324440,287.440094 97.807945,295.923096 109.529411,295.948547 
	C152.694946,296.042297 195.860840,295.962494 239.026566,295.994324 
	C243.187180,295.997406 246.875916,294.919891 250.223297,292.432800 
	C256.472870,287.789429 259.009003,281.671661 258.991669,273.867676 
	C258.856659,213.035950 258.920746,152.203796 258.901642,91.371773 
	C258.897247,77.321396 250.996277,69.293747 236.998856,69.224358 
	C220.499603,69.142563 203.999634,69.202675 186.500000,69.200493 
z"
                />
            </svg>
            <Handle type="source" position={Position.Bottom} style={{ bottom: '10px', opacity: 0 }} />
        </div>
    );
}
