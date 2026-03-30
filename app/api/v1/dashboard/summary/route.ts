import { NextResponse } from "next/server";
import {
	dashboardSummary1m,
	dashboardSummary1y,
	dashboardSummaryEmpty,
	dashboardSummaryInvalidDateRange,
} from "@/mocks/fixtures/dashboardSummaryBodies";

export function GET(request: Request) {
	// Mirror mocks/handlers.ts logic to keep SSR and client consistent
	const url = new URL(request.url);
	const search = url.searchParams;

	const startDate = search.get("startDate");
	const endDate = search.get("endDate");

	// Optional: basic validation parity
	if (startDate && endDate && startDate > endDate) {
		return NextResponse.json(dashboardSummaryInvalidDateRange, { status: 400 });
	}

	const rawTimeFilter = search.get("timeFilter");
	if (rawTimeFilter === null) {
		return NextResponse.json(dashboardSummaryEmpty);
	}

	const timeFilter = rawTimeFilter.toUpperCase();
	const fixtures: Record<string, unknown> = {
		"1M": dashboardSummary1m,
		"1Y": dashboardSummary1y,
	};

	const body = fixtures[timeFilter] ?? dashboardSummary1m;
	return NextResponse.json(body);
}

