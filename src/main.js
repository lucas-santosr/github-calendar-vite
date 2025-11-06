import './styles.css'
import html2canvas from 'html2canvas'

const app = document.getElementById('app')

app.innerHTML = `
  <div class="wrapper">
    <header>
      <div class="title">Quantidade de eventos ao longo dos anos</div>
      <div class="controls">
        <input id="file" type="file" accept=".csv" />
        <button id="export" class="btn" disabled>Exportar como PNG</button>
      </div>
    </header>

    <div class="legend">
      <span>Menos</span>
      ${[...Array(8).keys()].map(i => `<span class="sw c${i}"></span>`).join('')}
      <span>Mais</span>
    </div>

    <div id="container"></div>
  </div>
`

const fileInput = document.getElementById('file')
const exportBtn = document.getElementById('export')
const container = document.getElementById('container')

fileInput.addEventListener('change', async (e) => {
  const file = e.target.files?.[0]
  if (!file) return
  
  try {
    const text = await file.text()
    const rows = parseCSV(text)
    renderAllYears(rows)
    exportBtn.disabled = false
  } catch (err) {
    alert('Erro ao processar CSV: ' + err.message)
  }
})

exportBtn.addEventListener('click', async () => {
  const canvas = await html2canvas(container, { backgroundColor: '#ffffff', scale: 2 })
  const a = document.createElement('a')
  a.href = canvas.toDataURL('image/png')
  a.download = 'calendario-eventos.png'
  a.click()
})

function parseCSV(text) {
  const firstLine = text.trim().split(/\r?\n/)[0]
  const sep = firstLine.includes(';') ? ';' : ','
  const lines = text.trim().split(/\r?\n/)
  const header = lines[0].split(sep).map(s => s.trim().toLowerCase())
  
  const idxData = header.indexOf('data_evento')
  const idxTotal = header.indexOf('total_eventos')
  if (idxData === -1 || idxTotal === -1)
    throw new Error('Cabeçalho deve conter data_evento e total_eventos')
  
  const rows = []
  for (let i = 1; i < lines.length; i++) {
    const parts = safeSplitCSVLine(lines[i], sep)
    const data_evento = parts[idxData]?.trim()
    const total_eventos = Number((parts[idxTotal] ?? '').replace(',', '.'))
    if (data_evento && !isNaN(total_eventos)) rows.push({ data_evento, total_eventos })
  }
  return rows
}

function safeSplitCSVLine(line, sep) {
  const out = []
  let cur = '', inQuotes = false
  for (const ch of line) {
    if (ch === '"') { inQuotes = !inQuotes; continue }
    if (ch === sep && !inQuotes) { out.push(cur); cur = '' }
    else cur += ch
  }
  out.push(cur)
  return out
}

function groupByYear(rows) {
  const map = new Map()
  for (const r of rows) {
    const y = new Date(r.data_evento).getFullYear()
    if (!map.has(y)) map.set(y, [])
    map.get(y).push(r)
  }
  return Array.from(map.entries()).sort((a, b) => a[0] - b[0])
}

function renderAllYears(rows) {
  container.innerHTML = ''
  const grouped = groupByYear(rows)
  grouped.forEach(([year, list]) => container.appendChild(renderYearBlock(year, list)))
}

function renderYearBlock(year, list) {
  const block = document.createElement('div')
  block.className = 'year-block'
  
  const totalEventos = list.reduce((sum, r) => sum + r.total_eventos, 0)
  
  const yearContainer = document.createElement('div')
  yearContainer.className = 'year-container'
  
  const yearLabel = document.createElement('div')
  yearLabel.className = 'year-label'
  yearLabel.textContent = year
  yearContainer.appendChild(yearLabel)
  
  const content = document.createElement('div')
  content.className = 'calendar-content'
  
  const header = document.createElement('div')
  header.className = 'year-header'
  header.innerHTML = `<div class="year-title">${totalEventos.toLocaleString('pt-BR')} eventos</div>`
  content.appendChild(header)
  
  const gridRow = document.createElement('div')
  gridRow.className = 'grid-row'
  
  const weekdays = document.createElement('div')
  weekdays.className = 'weekday-wrapper'
  const lbls = document.createElement('div')
  lbls.className = 'weekday-labels'
  ;['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'].forEach(l => {
    const s = document.createElement('span')
    s.textContent = l
    lbls.appendChild(s)
  })
  weekdays.appendChild(lbls)
  gridRow.appendChild(weekdays)
  
  const monthsRow = document.createElement('div')
  monthsRow.className = 'months-row'
  
  const eventsMap = new Map(list.map(x => [x.data_evento, x.total_eventos]))
  const monthNames = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
  
  for (let m = 0; m < 12; m++) {
    const monthBlock = document.createElement('div')
    monthBlock.className = 'month-block'
    
    const monthLabel = document.createElement('div')
    monthLabel.className = 'month-name'
    monthLabel.textContent = monthNames[m]
    monthBlock.appendChild(monthLabel)
    
    const monthGrid = document.createElement('div')
    monthGrid.className = 'month-grid'
    
    const start = new Date(year, m, 1)
    const end = new Date(year, m + 1, 0)
    const offset = start.getDay() // dia da semana do 1º dia
    
    // Adiciona células vazias antes do primeiro dia real do mês
    for (let i = 0; i < offset; i++) {
      const empty = document.createElement('div')
      empty.className = 'day empty'
      monthGrid.appendChild(empty)
    }
    
    // Adiciona os dias reais do mês
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const iso = d.toISOString().slice(0, 10)
      const val = eventsMap.get(iso) || 0
      const cell = document.createElement('div')
      cell.className = 'day'
      cell.style.background = colorFor(val)
      cell.title = `${iso}: ${val} eventos`
      monthGrid.appendChild(cell)
    }
    
    monthBlock.appendChild(monthGrid)
    monthsRow.appendChild(monthBlock)
  }
  
  gridRow.appendChild(monthsRow)
  content.appendChild(gridRow)
  yearContainer.appendChild(content)
  block.appendChild(yearContainer)
  return block
}

function colorFor(v) {
  const root = getComputedStyle(document.documentElement)
  if (v <= 0) return root.getPropertyValue('--c0')
  if (v <= 5) return root.getPropertyValue('--c1')
  if (v <= 10) return root.getPropertyValue('--c2')
  if (v <= 20) return root.getPropertyValue('--c3')
  if (v <= 30) return root.getPropertyValue('--c4')
  if (v <= 40) return root.getPropertyValue('--c5')
  if (v <= 50) return root.getPropertyValue('--c6')
  return root.getPropertyValue('--c7')
}
