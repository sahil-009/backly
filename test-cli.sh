#!/bin/bash

echo "🧪 Testing APIcraft CLI..."
echo ""

# Test 1: Generate a core template
echo "Test 1: Generating core template..."
node index.js --js --template core --name test-core-api --no-install
if [ -d "test-core-api" ]; then
    echo "✅ Core template generated successfully"
    rm -rf test-core-api
else
    echo "❌ Core template generation failed"
fi

echo ""

# Test 2: Generate a base template
echo "Test 2: Generating base template..."
node index.js --js --template base --name test-base-api --no-install
if [ -d "test-base-api" ]; then
    echo "✅ Base template generated successfully"
    rm -rf test-base-api
else
    echo "❌ Base template generation failed"
fi

echo ""

# Test 3: Generate a commerce template
echo "Test 3: Generating commerce template..."
node index.js --js --template commerce --name test-commerce-api --no-install
if [ -d "test-commerce-api" ]; then
    echo "✅ Commerce template generated successfully"
    rm -rf test-commerce-api
else
    echo "❌ Commerce template generation failed"
fi

echo ""
echo "🎉 All tests completed!"
