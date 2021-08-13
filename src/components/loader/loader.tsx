import * as React from "react"

interface Props {
    size: number;
}

const Loader: React.FC<Props> = ({size}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle cx={84} cy={50} r={10} fill="#303f9f">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="0.43859649122807015s"
          calcMode="spline"
          keyTimes="0;1"
          values="10;0"
          keySplines="0 0.5 0.5 1"
          begin="0s"
        />
        <animate
          attributeName="fill"
          repeatCount="indefinite"
          dur="1.7543859649122806s"
          calcMode="discrete"
          keyTimes="0;0.25;0.5;0.75;1"
          values="#303f9f;#bdbdbd;#3f51b5;#c5cae9;#303f9f"
          begin="0s"
        />
      </circle>
      <circle cx={16} cy={50} r={10} fill="#303f9f">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1.7543859649122806s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="0s"
        />
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1.7543859649122806s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="0s"
        />
      </circle>
      <circle cx={50} cy={50} r={10} fill="#c5cae9">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1.7543859649122806s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.43859649122807015s"
        />
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1.7543859649122806s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.43859649122807015s"
        />
      </circle>
      <circle cx={84} cy={50} r={10} fill="#3f51b5">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1.7543859649122806s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.8771929824561403s"
        />
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1.7543859649122806s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-0.8771929824561403s"
        />
      </circle>
      <circle cx={16} cy={50} r={10} fill="#bdbdbd">
        <animate
          attributeName="r"
          repeatCount="indefinite"
          dur="1.7543859649122806s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="0;0;10;10;10"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-1.3157894736842104s"
        />
        <animate
          attributeName="cx"
          repeatCount="indefinite"
          dur="1.7543859649122806s"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          values="16;16;16;50;84"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          begin="-1.3157894736842104s"
        />
      </circle>
    </svg>
  )
}

export default Loader
